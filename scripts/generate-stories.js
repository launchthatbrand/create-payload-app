#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as reactDocgen from 'react-docgen';
import { sync as globSync } from 'glob';

// Get the directory name using ESM compatible approach
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Generate Storybook stories for all React components in a package
 * @param {string} packageName - Name of the installed npm package
 * @param {object} options - Additional options
 */
async function generateStoriesForPackage(packageName, options = {}) {
  const {
    outputDir = './src/stories',
    componentsGlob = '**/!(*.stories|*.test|*.spec).{jsx,tsx,js,ts}',
    includeProps = true,
    includeDocs = true,
    verbose = false,
    storybookVersion = 7, // Default to Storybook v7 format
  } = options;

  console.log(`Generating Storybook stories for: ${packageName}`);

  // Find the package in node_modules
  const packagePath = path.join(process.cwd(), 'node_modules', packageName);
  if (!fs.existsSync(packagePath)) {
    console.error(`Could not find package "${packageName}" in node_modules. Is it installed?`);
    process.exit(1);
  }

  console.log(`Found package at: ${packagePath}`);

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Find component files in the package
  const componentPaths = findComponentFiles(packagePath, componentsGlob);
  console.log(`Found ${componentPaths.length} potential component files`);

  // Extract component info and generate stories
  const components = [];
  
  for (const filePath of componentPaths) {
    try {
      const relativePath = path.relative(packagePath, filePath);
      if (verbose) console.log(`Processing: ${relativePath}`);
      
      const componentInfo = extractComponentInfo(filePath, packageName);
      
      if (componentInfo.length > 0) {
        components.push(...componentInfo);
        
        // Generate stories for each component found in the file
        for (const component of componentInfo) {
          await generateStory(component, packageName, outputDir, { 
            storybookVersion,
            includeProps,
            includeDocs, 
            verbose 
          });
        }
      }
    } catch (error) {
      if (verbose) {
        console.error(`Error processing file ${filePath}:`, error);
      }
    }
  }

  // Generate an index story
  if (components.length > 0) {
    generateIndexStory(components, packageName, outputDir, { storybookVersion });
  }

  console.log(`✅ Generated ${components.length} Storybook stories in ${outputDir}`);
  return components;
}

/**
 * Find component files in a package
 */
function findComponentFiles(packagePath, componentsGlob) {
  // Skip node_modules within the package
  const ignorePattern = '**/node_modules/**';
  
  // Find component files using glob
  const files = globSync(path.join(packagePath, componentsGlob), {
    ignore: ignorePattern,
    nodir: true
  });
  
  return files;
}

/**
 * Extract component information from a file
 */
function extractComponentInfo(filePath, packageName) {
  // Try to read the file
  let content;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
  
  // Skip files that are unlikely to contain React components
  if (!content.includes('React') && 
      !content.includes('react') && 
      !content.includes('jsx') && 
      !content.includes('tsx') && 
      !content.includes('export') && 
      !content.includes('component')) {
    return [];
  }
  
  // Extract components using react-docgen
  try {
    const componentInfo = reactDocgen.parse(
      content, 
      reactDocgen.builtinResolvers.FindAllExportedComponentDefinitionsResolver
    );
    
    if (Array.isArray(componentInfo)) {
      return componentInfo.map(info => ({
        ...info,
        filePath
      }));
    } else if (componentInfo) {
      return [{
        ...componentInfo,
        filePath
      }];
    }
  } catch (error) {
    // Fallback: try to extract component names from exports
    const exportMatches = content.match(/export\s+(?:const|function|class)\s+(\w+)/g) || [];
    const components = [];
    
    for (const exportMatch of exportMatches) {
      const nameMatch = exportMatch.match(/export\s+(?:const|function|class)\s+(\w+)/);
      if (nameMatch && nameMatch[1] && /^[A-Z]/.test(nameMatch[1])) {
        components.push({
          displayName: nameMatch[1],
          filePath,
          props: {},
          description: `Component extracted from ${path.relative(process.cwd(), filePath)}`
        });
      }
    }
    
    return components;
  }
  
  return [];
}

/**
 * Generate a story file for a component
 */
async function generateStory(component, packageName, outputDir, options) {
  const { displayName, props = {}, description = '' } = component;
  const { storybookVersion, includeProps, includeDocs, verbose } = options;
  
  // Create component directory if it doesn't exist
  const componentDir = path.join(outputDir, displayName);
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }
  
  // Determine story file path
  const storyFilePath = path.join(componentDir, `${displayName}.stories.${storybookVersion >= 7 ? 'jsx' : 'js'}`);
  
  // Generate args based on props
  const args = {};
  const argTypes = {};
  
  if (includeProps && props) {
    Object.entries(props).forEach(([propName, propInfo]) => {
      // Skip children prop for args
      if (propName === 'children') return;
      
      const type = propInfo.type?.name || 'unknown';
      
      // Generate appropriate default value for arg based on type
      if (type === 'string') {
        args[propName] = '';
      } else if (type === 'number') {
        args[propName] = 0;
      } else if (type === 'bool' || type === 'boolean') {
        args[propName] = false;
      } else if (type === 'func' || type === 'function') {
        args[propName] = () => console.log(`${propName} triggered`);
      } else if (type === 'array') {
        args[propName] = [];
      } else if (type === 'object') {
        args[propName] = {};
      }
      
      // Create argType for proper controls
      argTypes[propName] = {
        description: propInfo.description || '',
        table: {
          type: { summary: type },
          defaultValue: { summary: propInfo.defaultValue?.value || 'undefined' }
        }
      };
      
      // Add control based on type
      if (type === 'string') {
        argTypes[propName].control = { type: 'text' };
      } else if (type === 'number') {
        argTypes[propName].control = { type: 'number' };
      } else if (type === 'bool' || type === 'boolean') {
        argTypes[propName].control = { type: 'boolean' };
      } else if (type === 'array') {
        argTypes[propName].control = { type: 'object' };
      } else if (type === 'object') {
        argTypes[propName].control = { type: 'object' };
      } else if (type === 'enum' && propInfo.type.value) {
        argTypes[propName].control = { 
          type: 'select', 
          options: propInfo.type.value.map(v => v.value.replace(/['"`]/g, ''))
        };
      }
    });
    
    // Special case for children
    if (props.children) {
      args.children = 'Example Content';
      argTypes.children = {
        description: props.children.description || 'Component children',
        control: { type: 'text' }
      };
    }
  }
  
  // Create story content based on Storybook version
  let storyContent;
  
  if (storybookVersion >= 7) {
    // Modern CSF3 format (Storybook 7+)
    const docComment = includeDocs && description 
      ? '/**\n * ' + description.split('\n').join('\n * ') + '\n */'
      : '';
    
    storyContent = 'import React from \'react\';\n' +
      'import { ' + displayName + ' } from \'' + packageName + '\';\n\n' +
      docComment + '\n' +
      'export default {\n' +
      '  title: \'' + packageName + '/' + displayName + '\',\n' +
      '  component: ' + displayName + ',\n' +
      '  parameters: {\n' +
      '    docs: {\n' +
      '      description: {\n' +
      '        component: ' + JSON.stringify(description || (displayName + ' component')) + '\n' +
      '      }\n' +
      '    }\n' +
      '  },\n' +
      '  argTypes: ' + JSON.stringify(argTypes, null, 2).replace(/"(\w+)":/g, '$1:').replace(/"function \(\) {\\n.*?}"/g, 'function() { console.log("Action triggered"); }') + ',\n' +
      '  tags: [\'autodocs\'],\n' +
      '};\n\n' +
      '/**\n' +
      ' * Primary template for the ' + displayName + ' component\n' +
      ' */\n' +
      'const Template = (args) => <' + displayName + ' {...args} />;\n\n' +
      '/**\n' +
      ' * Default state of the ' + displayName + ' component\n' +
      ' */\n' +
      'export const Default = Template.bind({});\n' +
      'Default.args = ' + JSON.stringify(args, null, 2).replace(/"(\w+)":/g, '$1:').replace(/"function \(\) {\\n.*?}"/g, 'function() { console.log("Action triggered"); }') + ';\n';
  } else {
    // Legacy format (Storybook 6 and earlier)
    storyContent = 'import React from \'react\';\n' +
      'import { ' + displayName + ' } from \'' + packageName + '\';\n\n' +
      'export default {\n' +
      '  title: \'' + packageName + '/' + displayName + '\',\n' +
      '  component: ' + displayName + ',\n' +
      '  parameters: {\n' +
      '    componentSubtitle: ' + JSON.stringify(description || (displayName + ' component')) + ',\n' +
      '  },\n' +
      '  argTypes: ' + JSON.stringify(argTypes, null, 2).replace(/"(\w+)":/g, '$1:').replace(/"function \(\) {\\n.*?}"/g, 'function() { console.log("Action triggered"); }') + ',\n' +
      '};\n\n' +
      'const Template = (args) => <' + displayName + ' {...args} />;\n\n' +
      'export const Default = Template.bind({});\n' +
      'Default.args = ' + JSON.stringify(args, null, 2).replace(/"(\w+)":/g, '$1:').replace(/"function \(\) {\\n.*?}"/g, 'function() { console.log("Action triggered"); }') + ';\n';
  }
  
  // Write story file
  fs.writeFileSync(storyFilePath, storyContent, 'utf8');
  
  if (verbose) {
    console.log(`Generated story: ${storyFilePath}`);
  }
  
  return storyFilePath;
}

/**
 * Generate an index story that links to all component stories
 */
function generateIndexStory(components, packageName, outputDir, options) {
  const { storybookVersion } = options;
  
  const indexFilePath = path.join(outputDir, `index.stories.${storybookVersion >= 7 ? 'mdx' : 'js'}`);
  
  let content;
  
  if (storybookVersion >= 7) {
    // MDX format for Storybook 7+
    const componentLinks = components.map(c => '- [' + c.displayName + '](?path=/docs/' + 
      packageName.toLowerCase() + '-' + c.displayName.toLowerCase() + '--docs) - ' + 
      (c.description || 'No description')).join('\n');
    
    const componentImports = components.map(c => c.displayName).join(', ');
    
    const componentExamples = components.slice(0, 3).map(c => '<' + c.displayName + ' />').join('\n    ');
    
    content = 'import { Meta } from \'@storybook/blocks\';\n\n' +
      '<Meta title="' + packageName + '/Introduction" />\n\n' +
      '# ' + packageName + ' Components\n\n' +
      'This package provides the following components:\n\n' +
      componentLinks + '\n\n' +
      '## Installation\n\n' +
      '```bash\n' +
      'npm install ' + packageName + '\n' +
      '# or\n' +
      'yarn add ' + packageName + '\n' +
      '# or\n' +
      'pnpm add ' + packageName + '\n' +
      '```\n\n' +
      '## Usage\n\n' +
      '```jsx\n' +
      'import { ' + componentImports + ' } from \'' + packageName + '\';\n\n' +
      'const Example = () => (\n' +
      '  <div>\n' +
      '    ' + componentExamples + '\n' +
      '    {/* Other components */}\n' +
      '  </div>\n' +
      ');\n' +
      '```\n';
  } else {
    // JS format for Storybook 6 and earlier
    content = `import React from 'react';

export default {
  title: '${packageName}/Introduction',
  parameters: {
    componentSubtitle: 'Package components overview',
    previewTabs: {
      canvas: { hidden: true },
    },
  },
};

export const Introduction = () => {
  return (
    <div>
      <h1>${packageName} Components</h1>
      <p>This package provides the following components:</p>
      <ul>
        ${components.map(c => `<li><strong>${c.displayName}</strong> - ${c.description || 'No description'}</li>`).join('\n        ')}
      </ul>
      
      <h2>Installation</h2>
      <pre>
        <code>
          npm install ${packageName}
          # or
          yarn add ${packageName}
        </code>
      </pre>
      
      <h2>Usage</h2>
      <pre>
        <code>
          {`
import { ${components.map(c => c.displayName).join(', ')} } from '${packageName}';

const Example = () => (
  <div>
    ${components.slice(0, 3).map(c => `<${c.displayName} />`).join('\n    ')}
    {/* Other components */}
  </div>
);
          `}
        </code>
      </pre>
    </div>
  );
};
`;
  }
  
  fs.writeFileSync(indexFilePath, content, 'utf8');
  console.log(`Generated index story: ${indexFilePath}`);
}

/**
 * Setup Storybook configuration for component documentation
 */
async function setupStorybookConfig(options = {}) {
  const { configDir = './.storybook', verbose = false } = options;
  
  // Ensure the .storybook directory exists
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
  
  // Create main.js if it doesn't exist
  const mainJsPath = path.join(configDir, 'main.js');
  if (!fs.existsSync(mainJsPath)) {
    const mainJs = `
module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  docs: {
    autodocs: 'tag',
  }
};
`;
    fs.writeFileSync(mainJsPath, mainJs);
    if (verbose) console.log(`Created ${mainJsPath}`);
  }
  
  // Create preview.js if it doesn't exist
  const previewJsPath = path.join(configDir, 'preview.js');
  if (!fs.existsSync(previewJsPath)) {
    const previewJs = `
import React from 'react';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    source: {
      state: 'open',
    },
  },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#ffffff',
      },
      {
        name: 'dark',
        value: '#333333',
      },
    ],
  },
};
`;
    fs.writeFileSync(previewJsPath, previewJs);
    if (verbose) console.log(`Created ${previewJsPath}`);
  }
  
  console.log(`✅ Storybook configuration setup complete!`);
}

// When script is run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.error('Usage: node generate-stories.js <package-name> [output-directory] [--setup-storybook] [--verbose] [--storybook-version=7]');
    process.exit(1);
  }
  
  const packageName = args[0];
  const options = {
    outputDir: './src/stories',
    verbose: false,
    setupStorybook: false,
    storybookVersion: 7
  };
  
  // Parse optional arguments
  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    
    if (arg.startsWith('--')) {
      // Option
      if (arg === '--verbose') {
        options.verbose = true;
      } else if (arg === '--setup-storybook') {
        options.setupStorybook = true;
      } else if (arg.startsWith('--storybook-version=')) {
        options.storybookVersion = parseInt(arg.replace('--storybook-version=', ''), 10);
      }
    } else {
      // Output directory
      options.outputDir = arg;
    }
  }
  
  // Setup storybook if requested
  if (options.setupStorybook) {
    setupStorybookConfig({ verbose: options.verbose })
      .then(() => {
        console.log('Storybook configuration completed.');
      })
      .catch(err => {
        console.error('Error setting up storybook:', err);
      });
  }
  
  // Generate stories
  generateStoriesForPackage(packageName, options)
    .then(components => {
      console.log(`Successfully generated stories for ${components.length} components from ${packageName}`);
    })
    .catch(err => {
      console.error('Error generating stories:', err);
    });
} else {
  // Export for use as a module
  export { generateStoriesForPackage, setupStorybookConfig };
}
