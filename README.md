# Payload CMS UI Component Documentation

This project provides Storybook documentation for UI components from the PayloadCMS UI library.

## Features

- Automatic story generation for PayloadCMS UI components
- Documentation of component props and usage examples
- Interactive playground for component testing
- Searchable component library

## Quick Start

```bash
# Install dependencies
pnpm install

# Generate stories for components
pnpm generate-stories

# Start Storybook
pnpm storybook
```

## Component Documentation

The documentation is automatically generated from the component's TypeScript definitions and includes:

- Component overview
- Props documentation
- Usage examples
- Interactive controls for testing different configurations

## Available Scripts

- `pnpm storybook` - Start Storybook development server
- `pnpm build-storybook` - Build static Storybook site for deployment
- `pnpm generate-stories` - Generate stories for all components using JavaScript
- `pnpm generate-stories:js` - Same as above, JavaScript implementation
- `pnpm generate-stories:sh` - Generate stories using shell script (may be faster for many components)
- `pnpm generate-story` - Generate story for a single component (needs parameters)

## Story Generation Options

You can generate stories in several ways:

```bash
# Generate stories for all components (JavaScript version)
pnpm generate-stories

# Generate stories for all components (Shell script version - may be faster)
pnpm generate-stories:sh

# Generate story for a specific component
pnpm generate-story @payloadcms/ui/dist/elements/Button --verbose

# Generate stories for specific components directly
node scripts/generate-stories.cjs @payloadcms/ui/dist/elements/Button --verbose
./scripts/generate-all-stories.sh
```

## Component Enhancement

After generating a story, you can enhance it with additional examples by editing the generated file in `src/stories/`. For example:

```jsx
// src/stories/Button/Button.stories.jsx

// Add different variants, sizes, examples of the component in use
export const PrimaryButton = Template.bind({})
PrimaryButton.args = {
  // Custom props
}
```

## Directory Structure

- `.storybook/` - Storybook configuration
- `scripts/` - Story generation scripts
- `src/stories/` - Generated component stories

## Adding New Components

New components from the Payload UI library will be automatically discovered by the script. If you want to add a custom component:

1. Create a new directory in `src/stories/YourComponent/`
2. Create a file named `YourComponent.stories.jsx` with the component documentation
3. Follow the pattern of other story files for structure and examples

## How It Works

The generation scripts:

1. Scan the `@payloadcms/ui/dist/elements` directory for component folders
2. Analyze each component's TypeScript definitions to extract props and types
3. Generate Storybook story files with comprehensive documentation
4. Create an index.stories.mdx file that categorizes and lists all components

## Troubleshooting

If you encounter issues with story generation:

1. Check that the component exists in the specified path
2. Verify the component has TypeScript definitions
3. Try running with the `--verbose` flag for more details
4. For compiled components, examine the `.d.ts` files to understand the component's props

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
