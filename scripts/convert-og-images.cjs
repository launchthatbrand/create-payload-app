#!/usr/bin/env node

/**
 * This script converts SVG images to PNG for use in OG tags
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// Check if we have necessary dependencies
function ensureDependenciesInstalled() {
  try {
    // Check if sharp is installed
    require.resolve('sharp')
    console.log('✅ Sharp is installed')
  } catch (e) {
    console.log('⚠️ Sharp is not installed. Installing now...')
    try {
      execSync('npm install --no-save sharp')
      console.log('✅ Sharp installed successfully')
    } catch (err) {
      console.error('❌ Failed to install Sharp:', err.message)
      process.exit(1)
    }
  }
}

async function convertSvgToPng() {
  ensureDependenciesInstalled()

  // Dynamically import sharp after ensuring it's installed
  const sharp = require('sharp')

  const staticDir = path.resolve(__dirname, '../.storybook/static')
  const buildDir = path.resolve(__dirname, '../storybook-static')

  // Create build directory if it doesn't exist
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true })
  }

  // Convert SVG files to PNG
  const svgFiles = [
    { input: 'og-image.svg', output: 'og-image.png', width: 1200, height: 630 },
    { input: 'apple-touch-icon.svg', output: 'apple-touch-icon.png', width: 180, height: 180 },
  ]

  for (const file of svgFiles) {
    const inputPath = path.join(staticDir, file.input)
    const outputPath = path.join(buildDir, file.output)

    if (!fs.existsSync(inputPath)) {
      console.error(`❌ Source file not found: ${inputPath}`)
      continue
    }

    try {
      await sharp(inputPath).resize(file.width, file.height).png().toFile(outputPath)

      console.log(`✅ Converted ${file.input} to ${file.output}`)

      // Also copy to static directory for local testing
      fs.copyFileSync(outputPath, path.join(staticDir, file.output))
      console.log(`✅ Copied ${file.output} to static directory`)
    } catch (err) {
      console.error(`❌ Error converting ${file.input}:`, err.message)
    }
  }

  // Copy additional PNG files that don't need conversion
  const filesToCopy = ['meta-image.png', 'payload-directory-logo.png']

  for (const file of filesToCopy) {
    const inputPath = path.join(staticDir, file)
    const outputPath = path.join(buildDir, file)

    if (!fs.existsSync(inputPath)) {
      console.error(`❌ Source file not found: ${inputPath}`)
      continue
    }

    try {
      fs.copyFileSync(inputPath, outputPath)
      console.log(`✅ Copied ${file} to build directory`)
    } catch (err) {
      console.error(`❌ Error copying ${file}:`, err.message)
    }
  }
}

// Run the conversion
convertSvgToPng().catch((err) => {
  console.error('❌ Conversion failed:', err)
  process.exit(1)
})
