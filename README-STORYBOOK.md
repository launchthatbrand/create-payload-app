# PayloadCMS UI Storybook

This repository contains a Storybook documentation for PayloadCMS UI components.

## Development

To run the Storybook locally:

```bash
pnpm storybook
```

## Customization

### Logo and Branding

The Storybook UI has been customized with Payload.Directory branding:

1. Replace the default Storybook logo with our custom logo
2. Set custom theme colors that match Payload's brand
3. Update the page title and favicon

The customization is done through these files:

- `.storybook/manager.js` - Controls the Storybook UI theme and branding
- `.storybook/preview-head.html` - Sets the page title and favicon
- `.storybook/static/payload-directory-logo.svg` - The custom logo (SVG version)
- `.storybook/static/payload-directory-logo.png` - The custom logo (PNG fallback)

To modify the branding:

1. Replace the logo files in `.storybook/static/` with your own
2. Update the theme colors in `.storybook/manager.js`
3. Modify the page title in `.storybook/preview-head.html`

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
   - `.storybook/manager.js` (for custom branding)
   - `.storybook/PayloadProviders.js`
   - `.storybook/PayloadTheme.js`
   - `.storybook/static/` (for custom assets)
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

If the custom logo isn't showing up:

1. Make sure the static directory is correctly configured in `.storybook/main.js`:

   ```js
   staticDirs: [
     { from: './static', to: '/' },
   ],
   ```

2. Verify that the logo files exist in `.storybook/static/`

3. Check that the path to the logo in `.storybook/manager.js` is correct
