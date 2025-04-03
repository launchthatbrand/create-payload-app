#!/usr/bin/env node

import * as reactDocgen from 'react-docgen'

import { join, dirname as pathDirname, resolve } from 'path'

import { fileURLToPath } from 'url'
import fs from 'fs'
import { sync as globSync } from 'glob'

// Get the directory name using ESM compatible approach
const __filename = fileURLToPath(import.meta.url)
const __dirname = pathDirname(__filename)

/**
 * Generate documentation for React components in an installed npm package
 * @param {string} packageName - Name of the installed npm package
 * @param {string} outputPath - Path where documentation will be saved
 * @param {object} options - Additional options
 */
export function generatePackageDocs(packageName, outputPath = './docs', options = {}) {
  const {
    componentsGlob = '**/*.{js,jsx,ts,tsx}',
    excludePattern = /node_modules|dist|\.next|build/,
    format = 'json',
    specificFiles = null,
    verbose = false,
    includeUtilityFunctions = true,
    mirrorStructure = false,
  } = options

  console.log(`Generating docs for package: ${packageName}`)

  try {
    // Find the package in node_modules
    let packagePath
    try {
      // In ESM, we don't have direct access to require.resolve
      // Instead, we'll construct the path to node_modules
      packagePath = join(process.cwd(), 'node_modules', packageName)

      if (!fs.existsSync(packagePath)) {
        console.error(`Could not find package "${packageName}" in node_modules. Is it installed?`)
        process.exit(1)
      }
    } catch (error) {
      console.error(`Could not find package "${packageName}" in node_modules. Is it installed?`)
      process.exit(1)
    }

    console.log(`Found package at: ${packagePath}`)

    // Ensure output directory exists
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true })
    }

    // Create package directory within the output directory
    const packageOutputDir = join(outputPath, packageName.replace('/', '-'))
    if (mirrorStructure && !fs.existsSync(packageOutputDir)) {
      fs.mkdirSync(packageOutputDir, { recursive: true })
    }

    // Parse each file for React components
    const components = {}
    const utilityFunctions = {}
    const typeDefinitions = {}

    // For tracking organized structure
    const fileDocMap = {}

    // Determine which files to process
    let filesToProcess = []

    if (specificFiles && specificFiles.length > 0) {
      // Process only specific files
      filesToProcess = specificFiles.map((file) => join(packagePath, file))
      console.log(`Will process ${filesToProcess.length} specified files`)
    } else {
      // Find all potential component files
      filesToProcess = globSync(join(packagePath, componentsGlob), {
        ignore: excludePattern,
      })
      console.log(`Found ${filesToProcess.length} potential component files`)
    }

    // Process each file
    filesToProcess.forEach((file) => {
      try {
        if (verbose) console.log(`Processing file: ${file}`)
        const content = fs.readFileSync(file, 'utf8')
        const relativePath = file.replace(packagePath, '')

        // For TypeScript declaration files, try to find the corresponding JS file
        if (file.endsWith('.d.ts') && !specificFiles) {
          const jsFile = file.replace('.d.ts', '.js')
          if (fs.existsSync(jsFile)) {
            if (verbose) console.log(`Found JS file for ${file}: ${jsFile}`)
            const jsContent = fs.readFileSync(jsFile, 'utf8')
            processFileContent(
              jsContent,
              jsFile,
              components,
              utilityFunctions,
              typeDefinitions,
              packagePath,
              verbose,
              fileDocMap,
            )
          }
        } else {
          processFileContent(
            content,
            file,
            components,
            utilityFunctions,
            typeDefinitions,
            packagePath,
            verbose,
            fileDocMap,
          )
        }
      } catch (readError) {
        console.error(`Error reading file: ${file}`, readError)
      }
    })

    // Generate documentation
    if (mirrorStructure) {
      // Generate in mirrored directory structure
      generateMirroredDocs(
        packageName,
        packageOutputDir,
        packagePath,
        components,
        utilityFunctions,
        typeDefinitions,
        fileDocMap,
        format,
        verbose,
        includeUtilityFunctions,
      )
    } else {
      // Generate in a single file (original behavior)
      const outputFilePath = join(outputPath, `${packageName.replace('/', '-')}-docs.${format}`)

      const result = {
        components,
        utilityFunctions: includeUtilityFunctions ? utilityFunctions : undefined,
        typeDefinitions,
      }

      if (format === 'json') {
        fs.writeFileSync(outputFilePath, JSON.stringify(result, null, 2))
      } else if (format === 'md') {
        const markdown = generateMarkdown(result, packageName)
        fs.writeFileSync(outputFilePath, markdown)
      }

      console.log(`Documentation saved to: ${outputFilePath}`)
    }

    console.log(
      `Found documentation for ${Object.keys(components).length} components, ${Object.keys(utilityFunctions).length} functions, and ${Object.keys(typeDefinitions).length} types`,
    )

    return {
      components,
      utilityFunctions: includeUtilityFunctions ? utilityFunctions : undefined,
      typeDefinitions,
    }
  } catch (error) {
    console.error('Error generating documentation:', error)
    process.exit(1)
  }
}

/**
 * Generate documentation in a directory structure mirroring the package
 */
function generateMirroredDocs(
  packageName,
  outputDir,
  packagePath,
  components,
  utilityFunctions,
  typeDefinitions,
  fileDocMap,
  format,
  verbose,
  includeUtilityFunctions,
) {
  // Generate index file
  generateIndexFile(packageName, outputDir, components, utilityFunctions, typeDefinitions, format)

  // Process each file in the documentation map
  Object.entries(fileDocMap).forEach(([filePath, items]) => {
    const relativePath = filePath.replace(packagePath, '')
    const dirPath = pathDirname(join(outputDir, relativePath))

    // Ensure directory exists
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }

    // Determine filename for documentation
    const ext = format === 'md' ? '.md' : '.json'
    const docFilePath = join(outputDir, `${relativePath}${ext}`)

    if (verbose) {
      console.log(`Generating docs for ${relativePath} at ${docFilePath}`)
    }

    // Generate content
    const fileComponents = items.components || {}
    const fileUtilityFunctions = items.utilityFunctions || {}
    const fileTypes = items.typeDefinitions || {}

    const result = {
      components: fileComponents,
      utilityFunctions: includeUtilityFunctions ? fileUtilityFunctions : undefined,
      typeDefinitions: fileTypes,
    }

    if (format === 'json') {
      fs.writeFileSync(docFilePath, JSON.stringify(result, null, 2))
    } else if (format === 'md') {
      const markdown = generateMarkdown(result, `${packageName}${relativePath}`)
      fs.writeFileSync(docFilePath, markdown)
    }
  })

  console.log(`Documentation generated in mirrored structure at: ${outputDir}`)
}

/**
 * Generate an index file with links to all documentation
 */
function generateIndexFile(
  packageName,
  outputDir,
  components,
  utilityFunctions,
  typeDefinitions,
  format,
) {
  const indexPath = join(outputDir, format === 'md' ? 'index.md' : 'index.json')

  if (format === 'json') {
    // JSON index
    const index = {
      packageName,
      components: Object.keys(components),
      utilityFunctions: Object.keys(utilityFunctions),
      typeDefinitions: Object.keys(typeDefinitions),
    }
    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2))
  } else if (format === 'md') {
    // Markdown index
    let markdown = `# ${packageName} Documentation\n\n`

    markdown += `## Table of Contents\n\n`

    if (Object.keys(components).length > 0) {
      markdown += `### Components\n\n`
      Object.entries(components)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .forEach(([name, info]) => {
          const relativePath = info.filePath
          markdown += `- [${name}](${relativePath}.md)\n`
        })
      markdown += `\n`
    }

    if (Object.keys(utilityFunctions).length > 0) {
      markdown += `### Utility Functions\n\n`
      Object.entries(utilityFunctions)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .forEach(([name, info]) => {
          const relativePath = info.filePath
          markdown += `- [${name}](${relativePath}.md)\n`
        })
      markdown += `\n`
    }

    if (Object.keys(typeDefinitions).length > 0) {
      markdown += `### Type Definitions\n\n`
      Object.entries(typeDefinitions)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .forEach(([name, info]) => {
          const relativePath = info.filePath
          markdown += `- [${name}](${relativePath}.md)\n`
        })
      markdown += `\n`
    }

    fs.writeFileSync(indexPath, markdown)
  }

  console.log(`Index file generated at: ${indexPath}`)
}

/**
 * Process file content to extract component documentation
 */
function processFileContent(
  content,
  file,
  components,
  utilityFunctions,
  typeDefinitions,
  packagePath,
  verbose = false,
  fileDocMap = {},
) {
  const baseName = extractComponentName(file)
  const relativePath = file.replace(packagePath, '')

  // Initialize entry in fileDocMap if it doesn't exist
  if (!fileDocMap[file]) {
    fileDocMap[file] = {
      components: {},
      utilityFunctions: {},
      typeDefinitions: {},
    }
  }

  try {
    // First try to extract React components
    let componentFound = false

    if (
      content.includes('React') ||
      content.includes('react') ||
      content.includes('jsx') ||
      content.includes('tsx')
    ) {
      // Try different resolver strategies
      const strategies = [
        // Standard component definitions
        {
          name: 'FindAllDefinitionsResolver',
          resolver: reactDocgen.builtinResolvers.FindAllDefinitionsResolver,
        },
        // Find only exported components
        {
          name: 'FindExportedDefinitionsResolver',
          resolver: reactDocgen.builtinResolvers.FindExportedDefinitionsResolver,
        },
        // Function components
        {
          name: 'FindAllExportedComponentDefinitionsResolver',
          resolver: reactDocgen.builtinResolvers.FindAllExportedComponentDefinitionsResolver,
        },
      ]

      for (const strategy of strategies) {
        try {
          if (verbose) console.log(`Trying ${strategy.name} for ${file}`)
          const componentInfo = reactDocgen.parse(content, strategy.resolver)

          if (componentInfo && (Array.isArray(componentInfo) ? componentInfo.length > 0 : true)) {
            const infoArray = Array.isArray(componentInfo) ? componentInfo : [componentInfo]

            infoArray.forEach((info) => {
              const componentName = info.displayName || baseName || 'UnnamedComponent'

              // Store component documentation
              components[componentName] = {
                ...info,
                filePath: relativePath,
              }

              // Also store in fileDocMap
              fileDocMap[file].components[componentName] = {
                ...info,
                filePath: relativePath,
              }

              console.log(`Extracted component docs for: ${componentName}`)
              componentFound = true
            })

            // If we found components with this strategy, no need to try others
            break
          }
        } catch (strategyError) {
          if (verbose)
            console.log(`Strategy ${strategy.name} failed for ${file}: ${strategyError.message}`)
          // Continue to the next strategy
        }
      }
    }

    // If we didn't find a component, try to extract utility functions or types
    if (!componentFound) {
      if (
        file.endsWith('.js') ||
        file.endsWith('.jsx') ||
        file.endsWith('.ts') ||
        file.endsWith('.tsx')
      ) {
        const foundFunctions = extractUtilityFunctions(
          content,
          file,
          utilityFunctions,
          packagePath,
          fileDocMap[file].utilityFunctions,
        )
        if (foundFunctions && verbose) {
          console.log(`Found utility functions in ${file}`)
        }
      }

      if (file.endsWith('.d.ts')) {
        const foundTypes = extractTypeDefinitions(
          content,
          file,
          typeDefinitions,
          packagePath,
          fileDocMap[file].typeDefinitions,
        )
        if (foundTypes && verbose) {
          console.log(`Found type definitions in ${file}`)
        }
      }

      // Try source map files
      if (file.endsWith('.map')) {
        try {
          const mapContent = JSON.parse(content)
          if (mapContent.sources) {
            if (verbose)
              console.log(`Found source map with ${mapContent.sources.length} sources in ${file}`)
          }
        } catch (e) {
          if (verbose) console.log(`Error parsing source map: ${e.message}`)
        }
      }
    }
  } catch (parseError) {
    if (verbose) console.error(`Error parsing file: ${file}`, parseError)
  }
}

/**
 * Extract component name from file path
 */
function extractComponentName(filePath) {
  const filename = filePath.split('/').pop()
  if (!filename) return null

  // Remove extension
  const name = filename.split('.')[0]

  // Convert to PascalCase if not already
  if (name && /^[a-z]/.test(name)) {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  return name
}

/**
 * Extract utility functions from JS/TS files
 */
function extractUtilityFunctions(
  content,
  file,
  utilityFunctions,
  packagePath,
  fileUtilityFunctions = {},
) {
  const fileName = extractComponentName(file)
  const relativePath = file.replace(packagePath, '')

  // Regular expressions to find exported functions
  const patterns = [
    // Arrow functions - export const funcName = () => {}
    { pattern: /export\s+const\s+(\w+)\s*=\s*(\([^)]*\)|[^=]*=>\s*)[^;]*/g, type: 'arrow' },
    // Regular functions - export function funcName() {}
    { pattern: /export\s+function\s+(\w+)\s*\([^)]*\)[^{]*{/g, type: 'function' },
    // Default exports - export default function funcName() {}
    { pattern: /export\s+default\s+function\s+(\w+)\s*\([^)]*\)[^{]*{/g, type: 'defaultFunction' },
    // Anonymous default exports - export default function() {}
    { pattern: /export\s+default\s+function\s*\(/g, type: 'anonymousDefault' },
  ]

  let functionsFound = false

  patterns.forEach(({ pattern, type }) => {
    const matches = content.matchAll(pattern)

    for (const match of matches) {
      const name = type === 'anonymousDefault' ? `${fileName}Default` : match[1]

      if (!name) continue

      // Extract parameters
      const params = []
      if (match[0]) {
        const paramMatch = match[0].match(/\(([^)]*)\)/)
        if (paramMatch && paramMatch[1]) {
          const paramList = paramMatch[1].split(',').map((p) => p.trim())

          for (const param of paramList) {
            if (param) {
              const [paramName, ...rest] = param.split(':')
              const paramType = rest.join(':').trim()

              params.push({
                name: paramName.trim(),
                type: paramType || 'any',
              })
            }
          }
        }
      }

      // Extract return type from TypeScript annotations or comments
      let returnType = 'any'
      const returnMatch = content.match(
        new RegExp(`${name}[^:]*:\\s*[^=]*=>\\s*([\\w<>{}\\[\\]|,'"\` ]+)`),
      )
      if (returnMatch && returnMatch[1]) {
        returnType = returnMatch[1].trim()
      }

      // Extract JSDoc comments
      let description = ''
      const lines = content.split('\n')
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(name) && lines[i].includes('export')) {
          // Look for JSDoc comment above
          let j = i - 1
          let commentLines = []
          // Skip blank lines
          while (j >= 0 && lines[j].trim() === '') j--
          // Collect comment lines
          while (j >= 0 && (lines[j].trim().startsWith('*') || lines[j].trim().startsWith('/'))) {
            commentLines.unshift(
              lines[j]
                .trim()
                .replace(/^\*\s*/, '')
                .replace(/^\/\*\*/, '')
                .replace(/\*\/$/, ''),
            )
            j--
          }
          if (commentLines.length > 0) {
            description = commentLines.join(' ').trim()
          }
          break
        }
      }

      // Add to utility functions
      const funcInfo = {
        name,
        description: description || `Utility function from ${relativePath}`,
        params,
        returnType,
        filePath: relativePath,
      }

      utilityFunctions[name] = funcInfo
      fileUtilityFunctions[name] = funcInfo

      functionsFound = true
      console.log(`Extracted utility function: ${name}`)
    }
  })

  return functionsFound
}

/**
 * Extract type definitions from TypeScript declaration files
 */
function extractTypeDefinitions(
  content,
  file,
  typeDefinitions,
  packagePath,
  fileTypeDefinitions = {},
) {
  const relativePath = file.replace(packagePath, '')

  // Find types and interfaces
  const typePatterns = [
    // type Name = ...
    { pattern: /type\s+(\w+)(?:<[^>]*>)?\s*=\s*([^;]*);/g, kind: 'type' },
    // interface Name {...}
    { pattern: /interface\s+(\w+)(?:<[^>]*>)?\s*{([^}]*)}/g, kind: 'interface' },
  ]

  let typesFound = false

  typePatterns.forEach(({ pattern, kind }) => {
    const matches = content.matchAll(pattern)

    for (const match of matches) {
      const name = match[1]
      const definition = match[2]

      if (!name) continue

      // Extract description from JSDoc comments
      let description = ''
      const lines = content.split('\n')
      for (let i = 0; i < lines.length; i++) {
        if (
          lines[i].includes(name) &&
          (lines[i].includes('type') || lines[i].includes('interface'))
        ) {
          // Look for JSDoc comment above
          let j = i - 1
          let commentLines = []
          // Skip blank lines
          while (j >= 0 && lines[j].trim() === '') j--
          // Collect comment lines
          while (j >= 0 && (lines[j].trim().startsWith('*') || lines[j].trim().startsWith('/'))) {
            commentLines.unshift(
              lines[j]
                .trim()
                .replace(/^\*\s*/, '')
                .replace(/^\/\*\*/, '')
                .replace(/\*\/$/, ''),
            )
            j--
          }
          if (commentLines.length > 0) {
            description = commentLines.join(' ').trim()
          }
          break
        }
      }

      const properties = {}

      // For interfaces, extract properties
      if (kind === 'interface' && definition) {
        const propertyMatches = definition.matchAll(/(\w+)(\??):\s*([^;]*);?/g)

        for (const propMatch of propertyMatches) {
          const [, propName, optional, propType] = propMatch
          properties[propName] = {
            type: propType.trim(),
            optional: optional === '?',
            description: '', // No way to extract JSDoc for individual properties easily
          }
        }
      }

      // Add to type definitions
      const typeInfo = {
        name,
        kind,
        description: description || `Type definition from ${relativePath}`,
        definition: definition.trim(),
        properties: Object.keys(properties).length > 0 ? properties : undefined,
        filePath: relativePath,
      }

      typeDefinitions[name] = typeInfo
      fileTypeDefinitions[name] = typeInfo

      typesFound = true
      console.log(`Extracted type definition: ${name}`)
    }
  })

  // Find exported functions (in .d.ts files)
  const functionPatterns = [
    { pattern: /export\s+declare\s+const\s+(\w+):\s*(\([^)]*\)[^;]*);/g, type: 'constFunction' },
    {
      pattern: /export\s+declare\s+function\s+(\w+)\s*\(([^)]*)\):\s*([^;]*);/g,
      type: 'declaredFunction',
    },
  ]

  functionPatterns.forEach(({ pattern, type }) => {
    const matches = content.matchAll(pattern)

    for (const match of matches) {
      const name = match[1]
      const signature = type === 'constFunction' ? match[2] : `(${match[2]}) => ${match[3]}`

      // Add as a type definition (function signature)
      const funcInfo = {
        name: `${name}()`,
        kind: 'function',
        description: `Function declared in ${relativePath}`,
        definition: signature.trim(),
        filePath: relativePath,
      }

      typeDefinitions[`${name}()`] = funcInfo
      fileTypeDefinitions[`${name}()`] = funcInfo

      typesFound = true
      console.log(`Extracted function signature: ${name}`)
    }
  })

  return typesFound
}

/**
 * Generate markdown documentation from component data
 */
function generateMarkdown(docData, packageName) {
  const { components, utilityFunctions, typeDefinitions } = docData
  let markdown = `# ${packageName} Documentation\n\n`

  // Table of contents
  markdown += `## Table of Contents\n\n`

  if (Object.keys(components).length > 0) {
    markdown += `- [Components](#components)\n`
    Object.keys(components)
      .sort()
      .forEach((name) => {
        markdown += `  - [${name}](#${name.toLowerCase()})\n`
      })
  }

  if (utilityFunctions && Object.keys(utilityFunctions).length > 0) {
    markdown += `- [Utility Functions](#utility-functions)\n`
    Object.keys(utilityFunctions)
      .sort()
      .forEach((name) => {
        markdown += `  - [${name}](#${name.toLowerCase()})\n`
      })
  }

  if (Object.keys(typeDefinitions).length > 0) {
    markdown += `- [Type Definitions](#type-definitions)\n`
    Object.keys(typeDefinitions)
      .sort()
      .forEach((name) => {
        markdown += `  - [${name}](#${name.toLowerCase().replace(/[^a-z0-9]/g, '')})\n`
      })
  }

  markdown += `\n`

  // Components section
  if (Object.keys(components).length > 0) {
    markdown += `## Components\n\n`

    Object.entries(components)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .forEach(([name, info]) => {
        markdown += `### ${name}\n\n`

        if (info.description) {
          markdown += `${info.description}\n\n`
        }

        markdown += `File: \`${info.filePath}\`\n\n`

        if (info.props && Object.keys(info.props).length > 0) {
          markdown += `#### Props\n\n`
          markdown += `| Name | Type | Default | Description |\n`
          markdown += `|------|------|---------|-------------|\n`

          Object.entries(info.props).forEach(([propName, propInfo]) => {
            const type = propInfo.type ? propInfo.type.name : 'unknown'
            const defaultValue = propInfo.defaultValue ? propInfo.defaultValue.value : '-'
            const description = propInfo.description || '-'

            markdown += `| ${propName} | ${type} | ${defaultValue} | ${description} |\n`
          })

          markdown += `\n`
        }

        if (info.methods && info.methods.length > 0) {
          markdown += `#### Methods\n\n`

          info.methods.forEach((method) => {
            markdown += `##### ${method.name}\n\n`

            if (method.description) {
              markdown += `${method.description}\n\n`
            }

            if (method.params && method.params.length > 0) {
              markdown += `Parameters:\n\n`
              method.params.forEach((param) => {
                markdown += `- \`${param.name}\`: ${param.description || ''}\n`
              })
              markdown += `\n`
            }

            if (method.returns) {
              markdown += `Returns: ${method.returns.description || ''}\n\n`
            }
          })
        }

        markdown += `---\n\n`
      })
  }

  // Utility functions section
  if (utilityFunctions && Object.keys(utilityFunctions).length > 0) {
    markdown += `## Utility Functions\n\n`

    Object.entries(utilityFunctions)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .forEach(([name, info]) => {
        markdown += `### ${name}\n\n`

        if (info.description) {
          markdown += `${info.description}\n\n`
        }

        markdown += `File: \`${info.filePath}\`\n\n`

        // Function signature
        const params = info.params.map((p) => `${p.name}: ${p.type}`).join(', ')
        markdown += `\`\`\`typescript\n${name}(${params}): ${info.returnType}\n\`\`\`\n\n`

        if (info.params.length > 0) {
          markdown += `#### Parameters\n\n`
          info.params.forEach((param) => {
            markdown += `- \`${param.name}\`: ${param.type}\n`
          })
          markdown += `\n`
        }

        markdown += `---\n\n`
      })
  }

  // Type definitions section
  if (Object.keys(typeDefinitions).length > 0) {
    markdown += `## Type Definitions\n\n`

    Object.entries(typeDefinitions)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .forEach(([name, info]) => {
        markdown += `### ${name}\n\n`

        if (info.description) {
          markdown += `${info.description}\n\n`
        }

        markdown += `File: \`${info.filePath}\`\n\n`

        // Type definition
        markdown += `\`\`\`typescript\n`
        if (info.kind === 'type') {
          markdown += `type ${name} = ${info.definition}\n`
        } else if (info.kind === 'interface') {
          markdown += `interface ${name} {\n`
          if (info.properties) {
            Object.entries(info.properties).forEach(([propName, propInfo]) => {
              markdown += `  ${propName}${propInfo.optional ? '?' : ''}: ${propInfo.type};\n`
            })
          } else {
            markdown += `  ${info.definition}\n`
          }
          markdown += `}\n`
        } else if (info.kind === 'function') {
          markdown += `function ${name}: ${info.definition}\n`
        }
        markdown += `\`\`\`\n\n`

        markdown += `---\n\n`
      })
  }

  return markdown
}

// When running directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2)

  if (args.length < 1) {
    console.error(
      'Usage: node generate-docs.js <package-name> [output-path] [--format=json|md] [--files=file1,file2,...] [--verbose] [--no-utility-functions] [--mirror-structure]',
    )
    process.exit(1)
  }

  const packageName = args[0]
  let outputPath = './docs'

  const options = {
    verbose: false,
    includeUtilityFunctions: true,
    mirrorStructure: false,
  }

  // Parse optional arguments
  for (let i = 1; i < args.length; i++) {
    const arg = args[i]

    if (arg.startsWith('--')) {
      // It's a flag or option
      if (arg.startsWith('--format=')) {
        options.format = arg.replace('--format=', '')
      } else if (arg.startsWith('--files=')) {
        options.specificFiles = arg.replace('--files=', '').split(',')
      } else if (arg === '--verbose') {
        options.verbose = true
      } else if (arg === '--no-utility-functions') {
        options.includeUtilityFunctions = false
      } else if (arg === '--mirror-structure') {
        options.mirrorStructure = true
      }
    } else {
      // It's likely the output path
      outputPath = arg
    }
  }

  generatePackageDocs(packageName, outputPath, options)
}
