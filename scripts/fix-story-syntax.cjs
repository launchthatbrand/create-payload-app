#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const glob = require('glob')

// Path to stories directory
const storiesDir = path.join(process.cwd(), 'src', 'stories')

// Process all story files
async function fixStorySyntax() {
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

      // Fix the syntax error with comma at the beginning of args
      const fixedContent = content.replace(/args\s*=\s*{\s*,/g, 'args = {')

      // Only write if changes were made
      if (fixedContent !== content) {
        fs.writeFileSync(fullPath, fixedContent)
        fixedCount++
        console.log(`Fixed: ${storyFile}`)
      }
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
fixStorySyntax().catch((error) => {
  console.error('Error:', error)
  process.exit(1)
})
