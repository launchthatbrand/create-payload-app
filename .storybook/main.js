import path from 'path'

// Vercel build check - if you see this in logs, the file is being read
console.log('Storybook main.js configuration loading...')

/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: [
    // Serve the PayloadCMS UI styles directory as a static directory
    { from: '../node_modules/@payloadcms/ui/dist', to: '/payloadcms-ui' },
    // Add a static directory for custom assets like logos
    { from: './static', to: '/' },
  ],
  webpackFinal: async (config) => {
    // Simplified CSS handling for PayloadCMS UI
    config.module.rules.unshift({
      test: /\.css$/,
      include: [/node_modules\/@payloadcms\/ui/],
      use: ['style-loader', 'css-loader'],
    })

    // Provide aliases for Next.js components
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve?.fallback,
        fs: false,
        path: false,
        os: false,
        child_process: false,
        module: false,
        url: false,
        assert: false,
        process: false,
        util: false,
        stream: false,
        buffer: false,
        crypto: false,
        worker_threads: false,
      },
      alias: {
        ...config.resolve?.alias,
        // Alias Next.js components to our mock implementations
        'next/link': path.resolve(__dirname, './mockNextComponents'),
        'next/navigation': path.resolve(__dirname, './mockNextNavigation'),
        'next/router': path.resolve(__dirname, './mockNextNavigation'),
      },
    }

    // Filter out stories that import components with server dependencies
    const problematicComponents = [
      'SortComplex',
      'BulkUpload',
      'Upload',
      'FileDetails',
      'EditUpload',
      'Dropzone',
    ]

    config.module.rules.push({
      test: /\.stories\.(jsx?|tsx?)$/,
      loader: 'null-loader',
      include: (resource) => {
        return problematicComponents.some((comp) => resource.includes(`/${comp}/`))
      },
    })

    return config
  },
}

export default config
