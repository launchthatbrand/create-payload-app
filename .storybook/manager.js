import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming/create'

// Create a custom theme for Storybook
const payloadTheme = create({
  base: 'light',

  // Brand configuration
  brandTitle: 'Payload.Directory Docs',
  brandUrl: 'https://payload.directory',
  brandImage: './payload-directory-logo.svg', // Using SVG for better scaling
  brandTarget: '_self',

  // UI colors
  colorPrimary: '#0066FF', // Payload blue
  colorSecondary: '#0055EE', // Payload blue (darker)

  // UI element colors
  appBg: '#FFFFFF',
  appContentBg: '#FFFFFF',
  appBorderColor: '#E8E8E8',
  appBorderRadius: 4,

  // Typography
  fontBase:
    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#0F0F0F',
  textInverseColor: '#FFFFFF',

  // Toolbar default and active colors
  barTextColor: '#333333',
  barSelectedColor: '#0066FF',
  barBg: '#F9F9F9',
})

// Apply the custom theme to Storybook
addons.setConfig({
  theme: payloadTheme,
  showToolbar: true,
})
