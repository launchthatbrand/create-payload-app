#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const reactDocgen = require('react-docgen')
const glob = require('glob')
const process = require('process')
// Add our custom props extractor
const { extractPropsFromCompiledComponent } = require('./extract-button-props.cjs')

const VERBOSE = process.argv.includes('--verbose')

function log(...args) {
  if (VERBOSE) {
    console.log(...args)
  }
}

/**
 * Generate Storybook stories for all React components in a package
 * @param {string} packageName - Name of the installed npm package
 * @param {object} options - Additional options
 */
async function generateStoriesForPackage(packageName, options = {}) {
  const {
    outputDir = './src/stories',
    componentsGlob = '**/!(*.stories|*.test|*.spec).{jsx,tsx,js,ts}',
    includeProps = true,
    includeDocs = true,
    verbose = false,
    storybookVersion = 7, // Default to Storybook v7 format
  } = options

  console.log(`Generating Storybook stories for: ${packageName}`)

  // Find the package in node_modules
  const packagePath = path.join(process.cwd(), 'node_modules', packageName)
  if (!fs.existsSync(packagePath)) {
    console.error(`Could not find package "${packageName}" in node_modules. Is it installed?`)
    process.exit(1)
  }

  console.log(`Found package at: ${packagePath}`)

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // ENHANCEMENT: Recursively search for component folders
  // Look for directories that might contain components
  // This will catch both direct component files and subdirectories with component files
  const potentialComponentDirs = findComponentDirectories(packagePath, verbose)

  if (verbose) {
    console.log(`Found ${potentialComponentDirs.length} potential component directories:`)
    potentialComponentDirs.forEach((dir) => console.log(`- ${dir}`))
  }

  // Find component files in all subdirectories
  let componentPaths = []
  for (const dir of potentialComponentDirs) {
    const filesInDir = findComponentFiles(dir, '**/index.{js,jsx,ts,tsx}')
    if (verbose && filesInDir.length > 0) {
      console.log(`Found ${filesInDir.length} potential component files in ${dir}`)
    }
    componentPaths.push(...filesInDir)
  }

  // Special case for specific component paths
  if (packageName.includes('/') && componentPaths.length === 0) {
    const specificComponentDir = packagePath
    if (fs.existsSync(specificComponentDir)) {
      const indexFile = path.join(specificComponentDir, 'index.js')
      if (fs.existsSync(indexFile)) {
        componentPaths.push(indexFile)
        if (verbose) console.log(`Found specific component at: ${indexFile}`)
      }
    }
  }

  console.log(`Found ${componentPaths.length} potential component files`)

  // Extract component info and generate stories
  const components = []

  for (const filePath of componentPaths) {
    try {
      const relativePath = path.relative(packagePath, filePath)
      if (verbose) console.log(`Processing: ${relativePath}`)

      // Try to find TypeScript definition files
      const dirName = path.dirname(filePath)
      const baseName = path.basename(filePath, path.extname(filePath))
      const dtsFile = path.join(dirName, `${baseName}.d.ts`)

      let tsTypes = null
      if (fs.existsSync(dtsFile)) {
        if (verbose) console.log(`Found TypeScript definitions at: ${dtsFile}`)
        tsTypes = extractTypesFromDTS(dtsFile)
      }

      const componentInfo = extractComponentInfo(filePath, packageName, tsTypes)

      if (componentInfo.length > 0) {
        components.push(...componentInfo)

        // Generate stories for each component found in the file
        for (const component of componentInfo) {
          await generateStory(component, packageName, outputDir, {
            storybookVersion,
            includeProps,
            includeDocs,
            verbose,
          })
        }
      } else if (verbose) {
        console.log(`No components found in: ${filePath}`)

        // Try harder for compiled component files
        if (filePath.endsWith('.js') && isCompiledComponent(filePath)) {
          const compDirName = path.basename(path.dirname(filePath))
          if (/^[A-Z]/.test(compDirName)) {
            console.log(`Detected compiled component: ${compDirName}`)

            // Read file content for more advanced prop extraction
            const content = fs.readFileSync(filePath, 'utf8')

            // Extract props using our specialized utility
            let props = extractPropsFromCompiledComponent(content, filePath)

            // Fallback to TS definition if no props were found
            if (Object.keys(props).length === 0 && tsTypes && tsTypes[compDirName]) {
              props = tsTypes[compDirName]
            }

            const component = {
              displayName: compDirName,
              description: `${compDirName} component from ${packageName}`,
              props,
              filePath,
            }

            components.push(component)
            await generateStory(component, packageName, outputDir, {
              storybookVersion,
              includeProps,
              includeDocs,
              verbose,
            })
          }
        }
      }
    } catch (error) {
      if (verbose) {
        console.error(`Error processing file ${filePath}:`, error)
      }
    }
  }

  // Generate an index story
  if (components.length > 0) {
    generateIndexStory(components, packageName, outputDir, { storybookVersion })
  }

  console.log(`✅ Generated ${components.length} Storybook stories in ${outputDir}`)
  return components
}

/**
 * Find directories that might contain React components
 */
function findComponentDirectories(basePath, verbose = false) {
  const dirs = []

  // First add the base path itself
  dirs.push(basePath)

  // If we're dealing with a package root, look for common component directories
  const commonComponentDirs = [
    path.join(basePath, 'dist'),
    path.join(basePath, 'dist/components'),
    path.join(basePath, 'dist/elements'),
    path.join(basePath, 'src'),
    path.join(basePath, 'src/components'),
    path.join(basePath, 'src/elements'),
    path.join(basePath, 'components'),
    path.join(basePath, 'elements'),
    path.join(basePath, 'ui'),
    path.join(basePath, 'lib'),
  ]

  for (const dir of commonComponentDirs) {
    if (fs.existsSync(dir)) {
      dirs.push(dir)
    }
  }

  // Recursively traverse subdirectories to find component folders
  function traverseDir(dirPath) {
    try {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true })

      for (const entry of entries) {
        // Skip node_modules and hidden folders
        if (entry.name.startsWith('.') || entry.name === 'node_modules') {
          continue
        }

        const fullPath = path.join(dirPath, entry.name)

        if (entry.isDirectory()) {
          // Check if it's potentially a component directory (PascalCase name or has index.js)
          const isPascalCase = /^[A-Z]/.test(entry.name)
          const hasIndexFile =
            fs.existsSync(path.join(fullPath, 'index.js')) ||
            fs.existsSync(path.join(fullPath, 'index.tsx'))

          if (isPascalCase || hasIndexFile) {
            dirs.push(fullPath)
          }

          // Continue traversing
          traverseDir(fullPath)
        }
      }
    } catch (error) {
      if (verbose) {
        console.error(`Error traversing directory ${dirPath}:`, error)
      }
    }
  }

  // Start traversal from base directories
  dirs.forEach((dir) => traverseDir(dir))

  // Remove duplicates
  return [...new Set(dirs)]
}

/**
 * Check if a file appears to be a compiled component
 */
function isCompiledComponent(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    // Look for common signs of compiled components
    return (
      content.includes('export const') ||
      content.includes('exports.') ||
      content.includes('React.createElement') ||
      content.includes('_jsx') ||
      content.includes('_jsxs') ||
      content.includes('buttonProps') || // Add additional check for button props
      content.includes('const Button')
    )
  } catch (error) {
    return false
  }
}

/**
 * Extract type information from TypeScript definition files
 */
function extractTypesFromDTS(dtsFilePath) {
  try {
    const content = fs.readFileSync(dtsFilePath, 'utf8')
    const types = {}

    // Extract component export declarations
    const exportMatches =
      content.match(/export\s+declare\s+(?:const|function|class)\s+(\w+)/g) || []
    for (const exportMatch of exportMatches) {
      const nameMatch = exportMatch.match(/export\s+declare\s+(?:const|function|class)\s+(\w+)/)
      if (nameMatch && nameMatch[1] && /^[A-Z]/.test(nameMatch[1])) {
        const componentName = nameMatch[1]
        types[componentName] = {}
      }
    }

    // Look for type/interface with Props in the name
    const propsTypeRegex = /(?:interface|type)\s+(\w*Props\w*)\s*(?:extends\s+\w+)?\s*\{([^}]*)\}/g
    let propsMatch
    while ((propsMatch = propsTypeRegex.exec(content)) !== null) {
      const typeName = propsMatch[1]
      const typeContent = propsMatch[2]

      // Extract properties from the interface
      const props = {}
      const propRegex = /(\w+)(\?)?:\s*([^;]*);/g
      let propMatch
      while ((propMatch = propRegex.exec(typeContent)) !== null) {
        const propName = propMatch[1]
        const optional = !!propMatch[2]
        const typeValue = propMatch[3].trim()

        props[propName] = {
          type: { name: typeValue },
          required: !optional,
          description: `${propName} property`,
        }
      }

      // Associate props with component if naming matches
      for (const componentName in types) {
        if (
          typeName.includes(componentName) ||
          componentName.includes(typeName.replace('Props', ''))
        ) {
          types[componentName] = props
          break
        }
      }
    }

    return types
  } catch (error) {
    console.error('Error parsing TypeScript definitions:', error)
    return {}
  }
}

/**
 * Find component files in a package
 */
function findComponentFiles(packagePath, componentsGlob) {
  // Skip node_modules within the package
  const ignorePattern = '**/node_modules/**'

  // Find component files using glob
  const files = glob.sync(path.join(packagePath, componentsGlob), {
    ignore: ignorePattern,
    nodir: true,
  })

  return files
}

/**
 * Extract component information from a file
 */
function extractComponentInfo(filePath, packageName, tsTypes = null) {
  // Try to read the file
  let content
  try {
    content = fs.readFileSync(filePath, 'utf8')
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)
    return []
  }

  // Use react-docgen to extract component info
  try {
    const componentInfo = reactDocgen.parse(
      content,
      reactDocgen.builtinResolvers.FindAllExportedComponentDefinitionsResolver,
    )
    return componentInfo.map((info) => ({
      ...info,
      filePath,
    }))
  } catch (error) {
    // If react-docgen fails, try our custom approach
    try {
      // For compiled components, check for specific patterns
      if (isCompiledComponent(filePath)) {
        const components = []
        const fileName = path.basename(path.dirname(filePath))

        // Look for export declarations
        const exportMatches = content.match(/export\s+const\s+(\w+)/g) || []

        for (const exportMatch of exportMatches) {
          const nameMatch = exportMatch.match(/export\s+const\s+(\w+)/)
          if (nameMatch && nameMatch[1] && /^[A-Z]/.test(nameMatch[1])) {
            const componentName = nameMatch[1]

            // Extract props using our specialized utility
            const props = extractPropsFromCompiledComponent(content, filePath)

            // If TypeScript types are available, merge them
            if (tsTypes && tsTypes[componentName]) {
              Object.assign(props, tsTypes[componentName])
            }

            components.push({
              displayName: componentName,
              description: `${componentName} component from ${packageName}`,
              props,
              filePath,
            })
          }
        }

        // If no components found but directory name starts with capital letter,
        // assume it's a component
        if (components.length === 0 && /^[A-Z]/.test(fileName)) {
          const props = extractPropsFromCompiledComponent(content, filePath)

          components.push({
            displayName: fileName,
            description: `${fileName} component from ${packageName}`,
            props,
            filePath,
          })
        }

        return components
      }
    } catch (customError) {
      if (options?.verbose) {
        console.error('Error in custom component extraction:', customError)
      }
    }

    return []
  }
}

/**
 * Generate a Storybook story file for a component
 */
async function generateStory(component, packageName, outputDir, options = {}) {
  const { storybookVersion = 7, verbose = false } = options

  const componentName = component.displayName
  const outputPath = path.join(outputDir, componentName)

  // Create component directory
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true })
  }

  // Generate import path for the component
  let importPath = ''
  if (component.filePath) {
    // Convert absolute path to relative package import
    if (component.filePath.includes('node_modules')) {
      // Example: /path/to/node_modules/package-name/dist/Button/index.js -> package-name/dist/Button
      const matches = component.filePath.match(/node_modules\/(.+?)\/(.+)/)
      if (matches && matches.length >= 3) {
        const pkgName = matches[1]
        let relPath = matches[2]
        // Remove file extension
        relPath = relPath.replace(/\.(js|jsx|ts|tsx)$/, '')
        importPath = `${pkgName}/${relPath}`
      }
    } else {
      // For local packages
      importPath = path.relative(process.cwd(), component.filePath)
      importPath = importPath.replace(/\.(js|jsx|ts|tsx)$/, '')
    }
  } else {
    // Fallback: use package name
    importPath = packageName
  }

  // Generate argTypes from props
  const argTypes = {}
  const defaultArgs = {}

  for (const [propName, propInfo] of Object.entries(component.props || {})) {
    if (!propInfo) continue

    const { type, description, required, defaultValue } = propInfo

    // Handle children special case
    if (propName === 'children') {
      argTypes[propName] = {
        description: description || 'Children to render',
        control: 'text',
      }
      defaultArgs[propName] = defaultValue?.value || 'Example Content'
      continue
    }

    // Skip internal props and functions
    if (
      propName.startsWith('_') ||
      propName === 'className' ||
      propName === 'style' ||
      type?.name?.includes('function')
    ) {
      continue
    }

    const typeName = type?.name || ''

    if (typeName.includes('|')) {
      // Handle union types like 'small' | 'medium' | 'large'
      const options = typeName
        .split('|')
        .map((t) => t.trim().replace(/['"]/g, ''))
        .filter((t) => t !== 'undefined' && t !== 'null')

      argTypes[propName] = {
        description: description || `${propName} property`,
        control: {
          type: options.length > 0 ? 'select' : 'text',
          options: options.length > 0 ? options : undefined,
        },
        table: {
          type: {
            summary: options.join(' | '),
          },
          defaultValue: defaultValue
            ? {
                summary: defaultValue.value,
              }
            : undefined,
        },
      }
    } else if (typeName === 'boolean') {
      argTypes[propName] = {
        description: description || `${propName} property`,
        control: 'boolean',
        table: {
          type: {
            summary: 'boolean',
          },
          defaultValue: defaultValue
            ? {
                summary: defaultValue.value,
              }
            : undefined,
        },
      }
    } else if (typeName === 'string') {
      argTypes[propName] = {
        description: description || `${propName} property`,
        control: 'text',
        table: {
          type: {
            summary: 'string',
          },
          defaultValue: defaultValue
            ? {
                summary: defaultValue.value,
              }
            : undefined,
        },
      }
    } else if (typeName === 'number') {
      argTypes[propName] = {
        description: description || `${propName} property`,
        control: 'number',
        table: {
          type: {
            summary: 'number',
          },
          defaultValue: defaultValue
            ? {
                summary: defaultValue.value,
              }
            : undefined,
        },
      }
    } else {
      // Default fallback for other types
      argTypes[propName] = {
        description: description || `${propName} property`,
        table: {
          type: {
            summary: typeName,
          },
          defaultValue: defaultValue
            ? {
                summary: defaultValue.value,
              }
            : undefined,
        },
      }
    }

    // Set default value for the story
    if (defaultValue && defaultValue.value !== undefined) {
      try {
        // Try to parse it if it's a string representation
        if (
          typeof defaultValue.value === 'string' &&
          (defaultValue.value.startsWith('{') ||
            defaultValue.value.startsWith('[') ||
            defaultValue.value === 'true' ||
            defaultValue.value === 'false' ||
            !isNaN(Number(defaultValue.value)))
        ) {
          defaultArgs[propName] = eval(`(${defaultValue.value})`)
        } else {
          defaultArgs[propName] = defaultValue.value
        }
      } catch (e) {
        defaultArgs[propName] = defaultValue.value
      }
    } else if (required) {
      // Provide a sensible default for required props
      if (typeName === 'string') {
        defaultArgs[propName] = ''
      } else if (typeName === 'number') {
        defaultArgs[propName] = 0
      } else if (typeName === 'boolean') {
        defaultArgs[propName] = false
      }
    }
  }

  // Generate story file content based on Storybook version
  let storyContent = ''

  if (storybookVersion >= 6) {
    // CSF format (Storybook 6+)
    storyContent = `import React from 'react';
import { ${componentName} } from '${importPath}';

/**
 * ${component.description || `${componentName} component from ${packageName}`}
 */
export default {
  title: '${packageName}/${componentName}',
  component: ${componentName},
  parameters: {
    docs: {
      description: {
        component: "${component.description || `${componentName} component from ${packageName}`}"
      }
    }
  },
  argTypes: ${JSON.stringify(argTypes, null, 2)},
  tags: ['autodocs'],
};

/**
 * Primary template for the ${componentName} component
 */
const Template = (args) => <${componentName} {...args} />;

/**
 * Default state of the ${componentName} component
 */
export const Default = Template.bind({});
Default.args = ${JSON.stringify(defaultArgs, null, 2)};
`
  } else {
    // Older Storybook format
    storyContent = `import React from 'react';
import { ${componentName} } from '${importPath}';

export default {
  title: '${packageName}/${componentName}',
  component: ${componentName},
  parameters: {
    componentSubtitle: '${component.description || `${componentName} component from ${packageName}`}',
  },
  argTypes: ${JSON.stringify(argTypes, null, 2)},
};

const Template = (args) => <${componentName} {...args} />;

export const Default = Template.bind({});
Default.args = ${JSON.stringify(defaultArgs, null, 2)};
`
  }

  const storyPath = path.join(outputPath, `${componentName}.stories.jsx`)
  fs.writeFileSync(storyPath, storyContent)

  if (verbose) {
    console.log(`Generated story: ${storyPath}`)
  }

  return storyPath
}

/**
 * Generate an index story in MDX format
 */
function generateIndexStory(components, packageName, outputDir, options = {}) {
  // Group components by subdirectory
  const componentsByCategory = {}

  for (const component of components) {
    const filePath = component.filePath
    let category = 'General'

    if (filePath) {
      const parts = filePath.split('/')
      // Try to find meaningful category from path
      const possibleCategories = ['elements', 'components', 'ui', 'forms', 'layout']
      for (let i = parts.length - 1; i >= 0; i--) {
        if (possibleCategories.includes(parts[i].toLowerCase())) {
          category = parts[i]
          break
        }
      }
    }

    if (!componentsByCategory[category]) {
      componentsByCategory[category] = []
    }
    componentsByCategory[category].push(component)
  }

  let mdxContent = `import { Meta } from '@storybook/blocks';

<Meta title="${packageName}/Introduction" />

# ${packageName} Components

This package provides the following components:

`

  // Add components by category
  for (const [category, comps] of Object.entries(componentsByCategory)) {
    mdxContent += `## ${category}\n\n`
    for (const comp of comps) {
      mdxContent += `- [${comp.displayName}](?path=/docs/${packageName.replace(/\//g, '-')}-${
        comp.displayName
      }--docs) - ${comp.description || `${comp.displayName} component from ${packageName}`}\n`
    }
    mdxContent += '\n'
  }

  mdxContent += `## Installation

\`\`\`bash
npm install ${packageName}
# or
yarn add ${packageName}
# or
pnpm add ${packageName}
\`\`\`

## Usage

\`\`\`jsx
import { ${components[0]?.displayName || 'Component'} } from '${packageName}';

const Example = () => (
  <div>
    <${components[0]?.displayName || 'Component'} />
    {/* Other components */}
  </div>
);
\`\`\`
`

  const indexPath = path.join(outputDir, 'index.stories.mdx')
  fs.writeFileSync(indexPath, mdxContent)

  return indexPath
}

// Main function that handles the CLI command
async function main() {
  console.time('Stories generation')

  const args = process.argv.slice(2)
  const options = {
    outputDir: './src/stories',
    verbose: false,
    storybookVersion: 7,
  }

  let packageName = ''

  // Parse command line arguments
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === '--output' && i + 1 < args.length) {
      options.outputDir = args[++i]
    } else if (arg === '--storybook' && i + 1 < args.length) {
      options.storybookVersion = parseInt(args[++i], 10)
    } else if (arg === '--verbose') {
      options.verbose = true
    } else if (!packageName) {
      packageName = arg
    }
  }

  if (!packageName) {
    console.error('Please provide a package name')
    console.error('Usage: node generate-stories.js <package-name> [options]')
    console.error('Options:')
    console.error('  --output <dir>     Output directory for stories (default: ./src/stories)')
    console.error('  --storybook <ver>  Storybook version (default: 7)')
    console.error('  --verbose          Enable verbose output')
    process.exit(1)
  }

  try {
    const components = await generateStoriesForPackage(packageName, options)
    console.log(
      `Successfully generated stories for ${components.length} components from ${packageName}`,
    )
  } catch (error) {
    console.error('Error generating stories:', error)
    process.exit(1)
  }

  console.timeEnd('Stories generation')
}

// Run the script
main()

module.exports = {
  generateStoriesForPackage,
}
