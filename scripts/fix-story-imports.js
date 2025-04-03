#!/usr/bin/env node

/**
 * Script to fix import paths in generated story files
 * The problem is that we're using internal paths that aren't exported in the package.json
 * This script converts all imports from:
 * '@payloadcms/ui/dist/elements/ComponentName/index'
 * to:
 * '@payloadcms/ui/elements/ComponentName'
 */

import fs from 'fs'
import { glob } from 'glob'
import path from 'path'

async function fixImports() {
  console.log('🔍 Finding all story files...')

  // Get all story files
  const storyFiles = await glob('src/stories/**/*.stories.{jsx,tsx,js,ts}')

  console.log(`Found ${storyFiles.length} story files to process`)

  let fixedCount = 0
  let errorCount = 0

  // Process each file
  for (const file of storyFiles) {
    try {
      console.log(`Processing ${file}...`)

      // Read the file
      let content = fs.readFileSync(file, 'utf8')

      // Check if the file has the problematic import pattern
      const importRegex =
        /import\s+\{\s*(\w+)(?:,\s*\w+)*\s*\}\s+from\s+['"]@payloadcms\/ui\/dist\/elements\/(\w+)\/index['"]/g

      // Replace with the correct import pattern - use /elements/ComponentName as per package.json exports
      const newContent = content.replace(
        importRegex,
        "import { $1 } from '@payloadcms/ui/elements/$2'",
      )

      // Also update any title paths in the story metadata
      const titleRegex = /title:\s*['"]@payloadcms\/ui\/dist\/elements\/(\w+)\/\w+['"]/g
      const updatedContent = newContent.replace(titleRegex, "title: '@payloadcms/ui/elements/$1'")

      // Only write if changes were made
      if (content !== updatedContent) {
        fs.writeFileSync(file, updatedContent, 'utf8')
        console.log(`✅ Fixed imports in ${file}`)
        fixedCount++
      } else {
        console.log(`⏩ No changes needed in ${file}`)
      }
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message)
      errorCount++
    }
  }

  // Also fix the index.stories.mdx file
  try {
    const indexFile = 'src/stories/index.stories.mdx'
    if (fs.existsSync(indexFile)) {
      console.log(`Processing ${indexFile}...`)
      let content = fs.readFileSync(indexFile, 'utf8')

      // Update import references in hyperlinks
      const linkRegex = /\[(\w+)\]\(\?path=\/docs\/@payloadcms-ui-dist-elements-(\w+)--docs\)/g
      const updatedContent = content.replace(
        linkRegex,
        '[$1](?path=/docs/@payloadcms-ui-elements-$2--docs)',
      )

      if (content !== updatedContent) {
        fs.writeFileSync(indexFile, updatedContent, 'utf8')
        console.log(`✅ Fixed links in ${indexFile}`)
        fixedCount++
      }
    }
  } catch (error) {
    console.error(`❌ Error processing index file:`, error.message)
    errorCount++
  }

  console.log('\n📊 Summary:')
  console.log(`Total files processed: ${storyFiles.length + 1}`) // +1 for index.stories.mdx
  console.log(`Files fixed: ${fixedCount}`)
  console.log(`Errors: ${errorCount}`)

  console.log('\n✨ Import paths fixed! Try running Storybook again.')
}

// Run the script
fixImports().catch((error) => {
  console.error('Failed to fix imports:', error)
  process.exit(1)
})
