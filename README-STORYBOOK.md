# PayloadCMS UI Storybook

This repository contains a Storybook documentation for PayloadCMS UI components.

## Development

To run the Storybook locally:

```bash
pnpm storybook
```

## Deployment to Vercel

When deploying to Vercel, make sure to:

1. Use the following build settings:

   - Framework Preset: Other
   - Build Command: `pnpm build-storybook`
   - Output Directory: `storybook-static`
   - Install Command: `pnpm install`

2. Set the following environment variables:

   - `NODE_VERSION`: `20.9.0`
   - `NODE_OPTIONS`: `--no-deprecation`

3. If you encounter problems with `.storybook` directory not being found:
   - Go to Vercel project settings
   - Under "General" section, enable "Include source files outside of the Root Directory in the Build Step"
4. Make sure your repository includes all the `.storybook` files:
   - `.storybook/main.js`
   - `.storybook/preview.js`
   - `.storybook/preview-head.html`
   - `.storybook/PayloadProviders.js`
   - `.storybook/PayloadTheme.js`
   - And other required configuration files

## Troubleshooting

If Vercel can't find the `.storybook` directory:

1. Check that your build command explicitly includes the config directory:

   ```
   storybook build --config-dir .storybook
   ```

2. Ensure the `.storybook` directory is committed to your repository

3. Make sure hidden files/directories are included in the build process

4. Check Vercel build logs for any specific errors
