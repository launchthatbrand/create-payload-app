#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const glob = require('glob')

// Map of problematic components that have duplicate IDs
const componentMapping = {
  // Format: 'ComponentName': ['FileA', 'FileB', etc.]
  Button: ['Button', 'ButtonContents'],
  DocumentDrawer: ['DocumentDrawer', 'DocumentDrawerToggler'],
  Drawer: ['Drawer', 'DrawerDepthContext', 'DrawerDepthProvider', 'DrawerToggler'],
  ListDrawer: ['ListDrawer', 'ListDrawerToggler'],
  Loading: [
    'FormLoadingOverlayToggle',
    'LoadingOverlay',
    'LoadingOverlayToggle',
    'LoadingOverlayProvider',
  ],
  ShimmerEffect: ['ShimmerEffect', 'StaggeredShimmers'],
  Upload: ['Upload', 'UploadActions'],
}

// Find all story files
console.log('🔍 Finding all story files with duplicate IDs...')
const storyFiles = glob.sync('src/stories/**/*.stories.jsx')

// Process each story file
let filesFixed = 0

storyFiles.forEach((filePath) => {
  const dirName = path.basename(path.dirname(filePath))

  // Check if this is a problematic component
  let needsFixing = false
  let componentKey = null

  for (const [key, components] of Object.entries(componentMapping)) {
    if (components.includes(dirName) && components[0] !== dirName) {
      needsFixing = true
      componentKey = key
      break
    }
  }

  if (needsFixing) {
    console.log(`Processing ${filePath}`)

    // Read the file content
    let content = fs.readFileSync(filePath, 'utf8')

    // Check if it's already using a custom story ID
    if (!content.includes('id:')) {
      // Find the export default statement
      const exportMatch = content.match(/export default\s*{([^}]*)}/s)
      if (exportMatch) {
        // Update the export default to include a unique ID
        const uniqueId = `payloadcms-ui-elements-${dirName.toLowerCase()}`
        const exportStatement = exportMatch[0]
        const exportContent = exportMatch[1]

        // Create a new export with the custom ID
        const updatedExport = exportStatement.replace(
          '{' + exportContent + '}',
          `{
  id: '${uniqueId}',${exportContent}
}`,
        )

        // Replace the original export with the updated one
        content = content.replace(exportStatement, updatedExport)

        // Write the updated content back to the file
        fs.writeFileSync(filePath, content, 'utf8')
        console.log(`✅ Fixed ID in ${filePath}`)
        filesFixed++
      } else {
        console.log(`❌ Could not find export default in ${filePath}`)
      }
    } else {
      console.log(`⏭️ Already has custom ID in ${filePath}`)
    }
  }
})

console.log(`\n📊 Summary:`)
console.log(`Total files with duplicate IDs fixed: ${filesFixed}`)
console.log(`\n✨ Story IDs fixed! Try running Storybook again.`)
