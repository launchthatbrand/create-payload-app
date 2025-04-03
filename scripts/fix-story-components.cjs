#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const glob = require('glob')

// List of components that need the link wrapper
const componentsNeedingLinkWrapper = [
  'Card',
  'ThumbnailCard',
  'AppHeader',
  'DocumentDrawer',
  'Banner',
  'Button',
  // Add more component names as needed
]

// Path to stories directory
const storiesDir = path.join(process.cwd(), 'src', 'stories')

// Path to wrapper file
const wrapperImportPath = '../../../.storybook/mockComponentWrappers'

// Process all story files
async function processStoryFiles() {
  const storyFiles = glob.sync('**/*.stories.jsx', { cwd: storiesDir })
  let processedCount = 0
  let fixedCount = 0
  let errorCount = 0

  console.log(`Found ${storyFiles.length} story files to process`)

  for (const storyFile of storyFiles) {
    const fullPath = path.join(storiesDir, storyFile)
    try {
      processedCount++

      // Read the file content
      const content = fs.readFileSync(fullPath, 'utf8')

      // Skip files that already have the wrapper
      if (content.includes(wrapperImportPath)) {
        console.log(`File already processed: ${storyFile}`)
        continue
      }

      // Check if this is one of our target components
      const needsWrapper = componentsNeedingLinkWrapper.some((compName) => {
        // Check if this is the component's story file or if it imports the component
        return (
          storyFile.includes(`${compName}/`) ||
          storyFile.includes(`${compName}.stories`) ||
          content.includes(`from '@payloadcms/ui/elements/${compName}'`)
        )
      })

      if (!needsWrapper) {
        continue
      }

      // Get the component name from the import statement
      const componentMatch = content.match(
        /import\s+{\s*([A-Za-z0-9_]+)\s*}\s+from\s+['"]@payloadcms\/ui\/elements\/([A-Za-z0-9_]+)['"]/,
      )

      if (!componentMatch) {
        console.log(`Could not find component import in: ${storyFile}`)
        continue
      }

      const componentName = componentMatch[1]
      const safeComponentName = `Safe${componentName}`

      // Prepare the updated content with wrapper
      let updatedContent = content

      // Add import for wrapper
      updatedContent = updatedContent.replace(
        /(import\s+.*?from\s+['"]@payloadcms\/ui\/elements\/.*?['"];?)/,
        `$1\nimport { withSafeLinks } from '${wrapperImportPath}';`,
      )

      // Add component wrapper definition
      updatedContent = updatedContent.replace(
        /(import\s+.*?from\s+['"]@payloadcms\/ui\/elements\/.*?['"];?\s*(?:import\s+.*?;\s*)*)(\s*\/\*\*)/,
        `$1\n// Use wrapper to ensure links have href props\nconst ${safeComponentName} = withSafeLinks(${componentName});\n\n$2`,
      )

      // Update the component in the template
      updatedContent = updatedContent.replace(
        new RegExp(
          `<${componentName}(\\s+{\\.\\.\\.(args|props)}\\s*\\/>|\\s+{\\.\\.\\.(args|props)}>.*?<\\/${componentName}>)`,
          'gs',
        ),
        `<${safeComponentName}$1`,
      )

      // Add default props if they don't exist
      if (!updatedContent.includes('"href":') && updatedContent.includes('args = {')) {
        updatedContent = updatedContent.replace(
          /(args\s*=\s*{[^}]*?)(\s*};)/,
          `$1,\n  "href": "#",\n  "title": "${componentName} Example"$2`,
        )
      }

      // Write the updated content
      fs.writeFileSync(fullPath, updatedContent)
      fixedCount++
      console.log(`Updated: ${storyFile}`)
    } catch (error) {
      console.error(`Error processing ${storyFile}:`, error)
      errorCount++
    }
  }

  console.log(`\nSummary:`)
  console.log(`- Processed: ${processedCount} files`)
  console.log(`- Fixed: ${fixedCount} files`)
  console.log(`- Errors: ${errorCount} files`)
}

// Run the script
processStoryFiles().catch((error) => {
  console.error('Error:', error)
  process.exit(1)
})
