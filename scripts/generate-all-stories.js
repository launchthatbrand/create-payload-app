#!/usr/bin/env node

/**
 * Script to generate Storybook stories for all components from the @payloadcms/ui library
 */

import { exec } from 'child_process'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const execPromise = promisify(exec)

async function generateStories() {
  console.log('🚀 Generating stories for all @payloadcms/ui components...')

  // Make sure the stories directory exists
  if (!fs.existsSync('./src/stories')) {
    fs.mkdirSync('./src/stories', { recursive: true })
  }

  // Get all component directories
  const componentsPath = path.resolve('./node_modules/@payloadcms/ui/dist/elements')

  try {
    const componentDirs = fs
      .readdirSync(componentsPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)
      .sort()

    console.log(`Found ${componentDirs.length} potential components in ${componentsPath}`)

    // Generate stories for each component
    const results = []
    let count = 0

    for (const component of componentDirs) {
      count++
      console.log(`[${count}/${componentDirs.length}] Processing ${component}...`)

      try {
        const { stdout, stderr } = await execPromise(
          `node scripts/generate-stories.cjs @payloadcms/ui/dist/elements/${component} --verbose`,
        )

        if (stderr && !stderr.includes('ExperimentalWarning')) {
          console.error(`Error generating stories for ${component}:`, stderr)
          results.push({ component, success: false, error: stderr })
        } else {
          console.log(`✅ Successfully generated stories for ${component}`)
          results.push({ component, success: true })
        }
      } catch (error) {
        console.error(`Failed to generate stories for ${component}:`, error.message)
        results.push({ component, success: false, error: error.message })
      }
    }

    // Print summary
    console.log('\n📊 Story Generation Summary:')
    console.log('=========================')

    const successful = results.filter((r) => r.success).length
    console.log(`✅ Successfully generated: ${successful}/${componentDirs.length}`)

    if (successful < componentDirs.length) {
      console.log('\n❌ Failed components:')
      results
        .filter((r) => !r.success)
        .forEach((result) => {
          console.log(`   - ${result.component}: ${result.error}`)
        })
    }

    // Update or create index.stories.mdx with all successful components
    updateIndexStory(results.filter((r) => r.success).map((r) => r.component))

    console.log('\n✨ Story generation complete! Stories are available in src/stories/')
  } catch (error) {
    console.error(`Failed to read component directories from ${componentsPath}:`, error)
    process.exit(1)
  }
}

function updateIndexStory(components) {
  const indexPath = './src/stories/index.stories.mdx'

  console.log(`Updating index story with ${components.length} components...`)

  // Group components by category
  const categorized = {
    'Basic Elements': [
      'Button',
      'Card',
      'Link',
      'Pill',
      'Loading',
      'ShimmerEffect',
      'Status',
      'Tooltip',
    ],
    'Layout Components': ['Banner', 'Collapsible', 'Drawer', 'Gutter', 'Modal', 'Popup'],
    'Data Display': ['Pagination', 'Table', 'ViewDescription', 'IDLabel'],
    'Form Elements': ['CodeEditor', 'DatePicker', 'FieldSelect', 'ReactSelect', 'TimezonePicker'],
    Navigation: ['AppHeader', 'Nav', 'NavGroup', 'Hamburger'],
    'Utility Components': [
      'Autosave',
      'CopyToClipboard',
      'LoadingOverlay',
      'SelectAll',
      'SortColumn',
    ],
    'Other Components': [], // Catch-all for uncategorized components
  }

  // Sort components into categories
  const categorizedComponents = {}
  components.forEach((component) => {
    let added = false
    for (const category in categorized) {
      if (categorized[category].includes(component)) {
        if (!categorizedComponents[category]) categorizedComponents[category] = []
        categorizedComponents[category].push(component)
        added = true
        break
      }
    }

    if (!added) {
      if (!categorizedComponents['Other Components']) categorizedComponents['Other Components'] = []
      categorizedComponents['Other Components'].push(component)
    }
  })

  // Create content with categories
  const content = `
import { Meta } from '@storybook/blocks';

<Meta title="@payloadcms/ui/Introduction" />

# Payload CMS UI Components

This Storybook showcases UI components from the Payload CMS UI library. These components are designed to help you build consistent, accessible, and beautiful interfaces.

## Component Categories

${Object.entries(categorizedComponents)
  .map(([category, comps]) => {
    if (!comps || comps.length === 0) return ''
    return `
### ${category}

${comps.map((comp) => `- [${comp}](?path=/docs/@payloadcms-ui-elements-${comp}--docs)`).join('\n')}
`
  })
  .join('\n')}

## Installation

\`\`\`bash
# Install the entire UI package
npm install @payloadcms/ui
# or
yarn add @payloadcms/ui
# or
pnpm add @payloadcms/ui
\`\`\`

## Usage

Please refer to individual component documentation for usage examples. Here are a few examples of commonly used components:

### Card Component

\`\`\`jsx
import { Card } from '@payloadcms/ui/dist/elements/Card';

const Example = () => (
  <Card 
    title="Example Card"
    actions={<button>Edit</button>}
  >
    <p>This is the content of the card.</p>
  </Card>
);
\`\`\`

### Pill Component

\`\`\`jsx
import { Pill } from '@payloadcms/ui/dist/elements/Pill';

const Example = () => (
  <div>
    <Pill>Default</Pill>
    <Pill pillStyle="success">Success</Pill>
    <Pill pillStyle="warning">Warning</Pill>
    <Pill pillStyle="error">Error</Pill>
    <Pill 
      icon={<span>✓</span>} 
      pillStyle="success"
    >
      Approved
    </Pill>
  </div>
);
\`\`\`

### Button Component

\`\`\`jsx
import { Button } from '@payloadcms/ui/dist/elements/Button';

const Example = () => (
  <div>
    <Button>Default Button</Button>
    <Button buttonStyle="secondary">Secondary Button</Button>
    <Button icon={<span>→</span>} iconPosition="right">
      With Icon
    </Button>
  </div>
);
\`\`\`

## Theming

These components are designed to work with Payload CMS's theming system and will automatically adapt to your project's theme colors when used within a Payload CMS project.

## Accessibility

All components are built with accessibility in mind and follow WAI-ARIA best practices. Interactive components support keyboard navigation and provide appropriate ARIA attributes.

## Documentation Extraction

This documentation is kept in sync with the implementation by analyzing TypeScript definitions and React prop types from the source code. The component API details are automatically extracted to ensure accurate documentation.

For more information, visit the [Payload CMS Documentation](https://payloadcms.com/docs).
`

  fs.writeFileSync(indexPath, content.trim())
  console.log(`✅ Updated index story at ${indexPath}`)
}

// Run the script
generateStories().catch((error) => {
  console.error('Failed to generate stories:', error)
  process.exit(1)
})
