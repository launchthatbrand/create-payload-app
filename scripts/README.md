# React Component Documentation Generator

This utility extracts documentation from React components in any installed npm package using `react-docgen`.

## Features

- Automatically locates and extracts component documentation from installed npm packages
- Supports documenting props, methods, and descriptions
- Outputs in JSON or Markdown format
- Simple command-line interface

## Prerequisites

- Node.js 14+
- An npm package installed in your project

## Usage

### Basic Usage

```bash
# Generate docs for a specific package
node scripts/generate-docs.js <package-name>

# Or if you've made the script executable:
./scripts/generate-docs.js <package-name>
```

### Options

```bash
# Specify output directory
node scripts/generate-docs.js <package-name> ./custom-docs-path

# Generate markdown instead of JSON
node scripts/generate-docs.js <package-name> --format=md

# Combine options
node scripts/generate-docs.js <package-name> ./custom-docs-path --format=md
```

### Examples

```bash
# Generate docs for Material UI Button component
node scripts/generate-docs.js @mui/material

# Generate docs for a specific UI library in markdown format
node scripts/generate-docs.js @payloadcmsdirectory/shadcn-ui ./docs/shadcn --format=md
```

## Output

The documentation will be generated in the specified output directory (defaults to `./docs`).

- JSON output: `./docs/[package-name]-docs.json`
- Markdown output: `./docs/[package-name]-docs.md`

## Programmatic Usage

You can also import and use the function in your own scripts:

```javascript
import { generatePackageDocs } from './scripts/generate-docs.js'

generatePackageDocs('package-name', './output-path', {
  format: 'md', // or 'json'
  componentsGlob: '**/*.{js,jsx,ts,tsx}', // pattern for finding component files
  excludePattern: /node_modules|dist|\.next|build/, // pattern to exclude
})
```

## Troubleshooting

- If no components are found, the package might not use standard React patterns that react-docgen can recognize
- Some packages might not include source code in their npm distribution
- If you get parsing errors, try updating to the latest version of react-docgen
