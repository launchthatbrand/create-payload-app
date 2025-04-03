// Import PayloadCMS UI styles directly using the officially supported subpath
import '@payloadcms/next/css'

// Import React and other dependencies
import React from 'react'
// Import the CSS debug utility
import debugCSS from './css-debug'
// Import the PayloadProviders decorator
import { withPayloadProviders } from './PayloadProviders'
import withPayloadTheme from './PayloadTheme'
import { withThemeByClassName } from '@storybook/addon-themes'

console.log('PayloadCMS UI styles imported')

// We'll use preview-head.html for global styles instead of CSS imports

// Create a mock for Next.js App Router
const MockNextRouter = {
  push: () => Promise.resolve(true),
  replace: () => Promise.resolve(true),
  prefetch: () => Promise.resolve(),
  back: () => {},
  forward: () => {},
  events: {
    on: () => {},
    off: () => {},
    emit: () => {},
  },
  refresh: () => {},
}

// Mock Next.js useRouter hook
const useRouter = () => MockNextRouter

// Add global mock for node modules that cause issues
if (typeof window !== 'undefined') {
  // Mock Node.js modules
  window.process = window.process || {}
  window.process.env = window.process.env || {}

  // Add Next.js router mocks to window
  window.next = {
    router: MockNextRouter,
  }

  // Add mock for the useRouter hook
  window.useRouter = useRouter
}

// Mock Next.js router context provider
const RouterContext = React.createContext({
  route: '/',
  pathname: '/',
  asPath: '/',
  query: {},
  push: () => Promise.resolve(true),
  replace: () => Promise.resolve(true),
  reload: () => Promise.resolve(true),
  back: () => Promise.resolve(true),
  prefetch: () => Promise.resolve(),
  events: {
    on: () => {},
    off: () => {},
    emit: () => {},
  },
  isFallback: false,
  isReady: true,
})

// Create a decorator to provide the router context
const withNextRouter = (Story) => {
  return (
    <RouterContext.Provider value={MockNextRouter}>
      <Story />
    </RouterContext.Provider>
  )
}

// Add code to check if PayloadCMS styles are loaded
const checkCSSLoaded = () => {
  if (typeof window === 'undefined') return

  // Wait for DOM to be ready
  window.addEventListener('DOMContentLoaded', () => {
    // Create a test button to check if styles are applied
    const testBtn = document.createElement('div')
    testBtn.className = 'btn btn--style-primary'
    testBtn.style.position = 'fixed'
    testBtn.style.bottom = '10px'
    testBtn.style.right = '10px'
    testBtn.style.zIndex = '9999'
    testBtn.style.padding = '8px 12px'
    testBtn.style.borderRadius = '4px'
    testBtn.style.fontSize = '12px'
    testBtn.style.fontFamily = 'monospace'
    testBtn.textContent = 'CSS Test Button'
    document.body.appendChild(testBtn)

    // Check if CSS is applied
    setTimeout(() => {
      const styles = window.getComputedStyle(testBtn)
      const hasPayloadStyles =
        styles.backgroundColor !== 'rgba(0, 0, 0, 0)' && styles.backgroundColor !== 'transparent'

      console.log('PayloadCMS CSS loaded:', hasPayloadStyles)
      console.log('Button background color:', styles.backgroundColor)
      console.log('Button text color:', styles.color)

      // Add indicator
      testBtn.textContent = hasPayloadStyles ? '✅ Payload CSS Loaded' : '❌ Payload CSS Missing'
      testBtn.style.backgroundColor = hasPayloadStyles ? '#4CAF50' : '#F44336'
      testBtn.style.color = 'white'
    }, 1000)
  })
}

// Run the CSS check
checkCSSLoaded()

// Run the CSS debug utility
if (typeof window !== 'undefined') {
  debugCSS()
}

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    backgrounds: {
      default: 'light',
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true, // Enable App Router support
      navigation: {
        pathname: '/',
      },
    },
  },
  decorators: [
    withNextRouter,
    withPayloadProviders,
    withPayloadTheme,
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
}

export default preview
