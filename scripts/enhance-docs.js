#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { generatePackageDocs } from './generate-docs.js';

const execAsync = promisify(exec);

// Get the directory name using ESM compatible approach
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Enhances documentation with AI assistance
 * @param {string} docsDir - Directory containing the generated documentation
 * @param {string} packageName - Name of the npm package
 * @param {object} options - Additional options
 */
async function enhanceDocsWithAI(docsDir, packageName, options = {}) {
  const {
    verbose = false,
    openAIApiKey = process.env.OPENAI_API_KEY,
    model = 'gpt-4-turbo', // Using the latest OpenAI model 
    maxFilesPerBatch = 5
  } = options;

  if (!openAIApiKey) {
    console.error('Error: OpenAI API key is required. Set the OPENAI_API_KEY environment variable or pass it in options.');
    process.exit(1);
  }

  const packageDir = path.join(docsDir, packageName.replace('/', '-'));
  
  if (!fs.existsSync(packageDir)) {
    console.error(`Error: Documentation directory not found: ${packageDir}`);
    process.exit(1);
  }

  console.log(`Enhancing documentation for ${packageName}...`);

  // Create a directory for enhanced docs
  const enhancedDir = path.join(docsDir, `${packageName.replace('/', '-')}-enhanced`);
  if (!fs.existsSync(enhancedDir)) {
    fs.mkdirSync(enhancedDir, { recursive: true });
  }

  // Copy all files from the original docs directory to the enhanced directory
  await copyDirectoryRecursive(packageDir, enhancedDir);
  
  // Find all markdown files
  const markdownFiles = getAllFiles(enhancedDir, '.md');
  console.log(`Found ${markdownFiles.length} documentation files to enhance`);

  // Process files in batches to avoid overwhelming the API
  const batches = [];
  for (let i = 0; i < markdownFiles.length; i += maxFilesPerBatch) {
    batches.push(markdownFiles.slice(i, i + maxFilesPerBatch));
  }

  let processedCount = 0;
  for (const batch of batches) {
    await Promise.all(batch.map(async file => {
      try {
        await enhanceDocFile(file, packageName, { openAIApiKey, model, verbose });
        processedCount++;
        console.log(`Enhanced ${processedCount}/${markdownFiles.length}: ${file}`);
      } catch (error) {
        console.error(`Error enhancing ${file}:`, error.message);
      }
    }));
  }

  // Also enhance the main index file
  const indexFile = path.join(enhancedDir, 'index.md');
  if (fs.existsSync(indexFile)) {
    await enhanceIndexFile(indexFile, packageName, { openAIApiKey, model, verbose });
    console.log(`Enhanced index file: ${indexFile}`);
  }

  console.log(`\nDocumentation enhancement complete! Enhanced docs available in: ${enhancedDir}`);
}

/**
 * Enhances a single documentation file with AI
 */
async function enhanceDocFile(filePath, packageName, options) {
  const { openAIApiKey, model, verbose } = options;
  
  // Read the original content
  const originalContent = fs.readFileSync(filePath, 'utf8');
  
  // Extract relative path
  const relativePath = filePath.split(`${packageName.replace('/', '-')}-enhanced`)[1] || path.basename(filePath);
  
  // Skip files that don't need enhancement
  if (originalContent.includes('AI-ENHANCED DOCUMENTATION')) {
    if (verbose) console.log(`File already enhanced: ${relativePath}`);
    return;
  }

  const promptTemplate = `
You are a technical documentation expert. Enhance the following React/JavaScript component documentation to make it more useful and readable.
For the component/utility documentation below:

1. Rewrite any bland descriptions to be more detailed and useful
2. Add usage examples for components or utility functions
3. Mention typical use cases
4. Describe how this component might interact with other components
5. Add prop descriptions where they're missing or unclear
6. Explain any complex concepts related to the component
7. Note any best practices for using the component

The path of this component is: ${relativePath}
Package name: ${packageName}

IMPORTANT: Maintain markdown formatting. Keep all existing sections but expand them.
Keep the basic structure of the documentation (title, table of contents, etc.).
Make sure that code examples are realistic, properly formatted, and demonstrate typical usage.
Always include the original documentation content, but enhance it.

Original Documentation:
${originalContent}
`;

  try {
    // Call the OpenAI API
    const aiResponse = await callOpenAI(promptTemplate, { openAIApiKey, model });
    
    // Add a note that this content was enhanced by AI
    const enhancedContent = `<!-- AI-ENHANCED DOCUMENTATION -->\n${aiResponse.trim()}`;
    
    // Write the enhanced content
    fs.writeFileSync(filePath, enhancedContent);
    
    if (verbose) {
      console.log(`Successfully enhanced: ${relativePath}`);
    }
  } catch (error) {
    throw new Error(`AI enhancement failed: ${error.message}`);
  }
}

/**
 * Enhances the main index file to provide a project overview
 */
async function enhanceIndexFile(indexPath, packageName, options) {
  const { openAIApiKey, model, verbose } = options;
  
  // Read the original content
  const originalContent = fs.readFileSync(indexPath, 'utf8');
  
  // Skip if already enhanced
  if (originalContent.includes('AI-ENHANCED DOCUMENTATION')) {
    if (verbose) console.log(`Index file already enhanced`);
    return;
  }

  // Try to collect package.json info for additional context
  let packageInfo = {};
  try {
    const packageJsonPath = path.join(process.cwd(), 'node_modules', packageName, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      packageInfo = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    }
  } catch (error) {
    console.warn('Could not read package.json:', error.message);
  }

  const promptTemplate = `
You are a technical documentation expert. Create an enhanced main documentation page for the following package.

Package: ${packageName}
Description: ${packageInfo.description || 'Not available'}
Version: ${packageInfo.version || 'Not available'}
License: ${packageInfo.license || 'Not available'}

The goal is to create a comprehensive introduction to this library that helps developers understand:
1. The purpose of the library
2. Main components and utilities
3. How components work together
4. Getting started guide
5. Common patterns and best practices

Original Index Content:
${originalContent}

IMPORTANT: 
- Maintain the original Markdown formatting and links
- Keep the Table of Contents section, but you can add new top-level sections
- Add installation instructions if not present
- Add a "Getting Started" section with basic examples
- Add a "Component Patterns" section to explain how components can be used together
`;

  try {
    // Call the OpenAI API
    const aiResponse = await callOpenAI(promptTemplate, { openAIApiKey, model });
    
    // Add a note that this content was enhanced by AI
    const enhancedContent = `<!-- AI-ENHANCED DOCUMENTATION -->\n${aiResponse.trim()}`;
    
    // Write the enhanced content
    fs.writeFileSync(indexPath, enhancedContent);
    
    if (verbose) {
      console.log(`Successfully enhanced index file`);
    }
  } catch (error) {
    throw new Error(`AI enhancement failed for index: ${error.message}`);
  }
}

/**
 * Helper to call OpenAI API
 */
async function callOpenAI(prompt, options) {
  const { openAIApiKey, model } = options;
  
  const data = {
    model: model,
    messages: [{ role: "system", content: "You are a documentation expert that enhances component documentation." }, 
               { role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 4000
  };
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openAIApiKey}`
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }
    
    const result = await response.json();
    return result.choices[0].message.content;
  } catch (error) {
    throw new Error(`OpenAI API request failed: ${error.message}`);
  }
}

/**
 * Helper to copy a directory recursively
 */
async function copyDirectoryRecursive(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const files = fs.readdirSync(source);
  
  for (const file of files) {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);
    
    const stat = fs.statSync(sourcePath);
    
    if (stat.isDirectory()) {
      await copyDirectoryRecursive(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
  }
}

/**
 * Helper to get all files with a specific extension in a directory
 */
function getAllFiles(dirPath, extension = '', fileList = []) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllFiles(filePath, extension, fileList);
    } else if (!extension || file.endsWith(extension)) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

/**
 * Full documentation workflow: Generate and then enhance
 */
async function generateAndEnhanceDocs(packageName, options = {}) {
  const {
    outputPath = './docs',
    format = 'md',
    mirrorStructure = true,
    openAIApiKey = process.env.OPENAI_API_KEY,
    verbose = false
  } = options;

  // Step 1: Generate base documentation
  console.log(`Step 1: Generating base documentation for ${packageName}...`);
  
  generatePackageDocs(packageName, outputPath, {
    format,
    mirrorStructure,
    verbose
  });

  // Step 2: Enhance with AI
  console.log(`\nStep 2: Enhancing documentation with AI...`);
  
  await enhanceDocsWithAI(outputPath, packageName, {
    openAIApiKey,
    verbose
  });

  console.log('\nDocumentation generation and enhancement complete!');
}

// When running directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.error('Usage: node enhance-docs.js <package-name> [output-path] [--format=json|md] [--verbose] [--skip-gen]');
    process.exit(1);
  }
  
  const packageName = args[0];
  let outputPath = './docs';
  
  const options = {
    verbose: false,
    format: 'md',
    mirrorStructure: true,
    openAIApiKey: process.env.OPENAI_API_KEY,
    skipGeneration: false
  };
  
  // Parse optional arguments
  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    
    if (arg.startsWith('--')) {
      // It's a flag or option
      if (arg.startsWith('--format=')) {
        options.format = arg.replace('--format=', '');
      } else if (arg === '--verbose') {
        options.verbose = true;
      } else if (arg === '--skip-gen') {
        options.skipGeneration = true;
      } else if (arg.startsWith('--api-key=')) {
        options.openAIApiKey = arg.replace('--api-key=', '');
      }
    } else {
      // It's likely the output path
      outputPath = arg;
    }
  }
  
  options.outputPath = outputPath;
  
  if (options.skipGeneration) {
    // Just run the enhancement
    enhanceDocsWithAI(outputPath, packageName, options)
      .catch(error => {
        console.error('Error enhancing documentation:', error);
        process.exit(1);
      });
  } else {
    // Run the full workflow
    generateAndEnhanceDocs(packageName, options)
      .catch(error => {
        console.error('Error in documentation workflow:', error);
        process.exit(1);
      });
  }
} else {
  export { enhanceDocsWithAI, generateAndEnhanceDocs }; 