#!/usr/bin/env node

/**
 * This script helps debug CSS loading issues in Storybook
 * It extracts the CSS from the @payloadcms/ui package and creates
 * a minimal CSS file with just the essential styles
 */

const fs = require('fs')
const path = require('path')

// Paths
const payloadCssPath = path.resolve(__dirname, '../node_modules/@payloadcms/ui/dist/styles.css')
const outputPath = path.resolve(__dirname, '../.storybook/payload-extracted.css')

// Extract and debug
async function extractCSS() {
  try {
    console.log('Starting CSS extraction and debug...')
    console.log(`Reading from: ${payloadCssPath}`)

    // Check if file exists
    if (!fs.existsSync(payloadCssPath)) {
      console.error('ERROR: PayloadCMS UI styles.css file not found!')
      console.log('Looking for file at:', payloadCssPath)

      // Check if the directory exists
      const dir = path.dirname(payloadCssPath)
      if (fs.existsSync(dir)) {
        console.log('Directory exists, listing contents:')
        const files = fs.readdirSync(dir)
        console.log(files)
      } else {
        console.log('Directory does not exist:', dir)
      }
      return
    }

    // Read the CSS file
    const css = fs.readFileSync(payloadCssPath, 'utf8')
    console.log(`Read ${css.length} bytes of CSS`)

    // Extract button styles
    const buttonStyleRegex = /\.btn[^}]+}|\.btn[^{]+{[^}]+}/g
    const buttonStyles = css.match(buttonStyleRegex) || []

    console.log(`Found ${buttonStyles.length} button style rules`)

    // Create a minimal CSS file with just the button styles
    const minimalCss = `
/**
 * Extracted button styles from @payloadcms/ui
 * For debugging Storybook CSS loading issues
 */

/* CSS Variables */
:root {
  --theme-elevation-0: #fff;
  --theme-elevation-50: #f9f9f9;
  --theme-elevation-100: #f3f3f3;
  --theme-elevation-150: #f0f0f0;
  --theme-elevation-200: #e7e7e7;
  --theme-elevation-300: #e5e5e5;
  --theme-elevation-400: #d1d1d1;
  --theme-elevation-500: #c5c5c5;
  --theme-elevation-1000: #333;
  
  --theme-success-500: #27a365;
  --theme-warning-500: #f5a941;
  --theme-error-500: #eb5656;
  
  --theme-bg: #fff;
  --theme-text: #0f0f0f;
  --theme-input-bg: #fff;
  --theme-border-color: #e8e8e8;
  --theme-brand: #0066ff;
  --theme-brand-hover: #0055ee;
}

/* Button styles */
${buttonStyles.join('\n\n')}
`

    // Write the extracted CSS
    fs.writeFileSync(outputPath, minimalCss)
    console.log(`Wrote minimal CSS to: ${outputPath}`)
    console.log('CSS extraction complete!')
    console.log('')
    console.log('To use this extracted CSS, add the following to .storybook/preview.js:')
    console.log('import "./payload-extracted.css";')
  } catch (error) {
    console.error('Error extracting CSS:', error)
  }
}

// Run the extraction
extractCSS()
