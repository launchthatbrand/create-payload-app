/**
 * Utility to extract buttonProps and similar objects from compiled React components
 */

// For CommonJS compatibility
const path = require('path')

/**
 * Extract props from compiled component code
 * @param {string} content - The component file content
 * @param {string} filePath - The path to the component file
 * @returns {Object} - Extracted props
 */
function extractPropsFromCompiledComponent(content, filePath) {
  const props = {}

  // Extract button props objects (like buttonProps, cardProps, etc.)
  extractPropsObjects(content, props)

  // Extract destructured props from function parameters
  extractDestructuredProps(content, props)

  // Extract from JSX attribute assignments
  extractJSXAttributes(content, props)

  // Add special handling for common component types
  enhancePropsForComponentType(props, filePath)

  return props
}

/**
 * Extract props objects like buttonProps, cardProps, etc.
 */
function extractPropsObjects(content, props) {
  // Match const propsObject = { ... } pattern
  const propsObjectMatches = content.match(/const\s+(\w+Props)\s*=\s*{([^}]*)}/gs)

  if (propsObjectMatches) {
    for (const match of propsObjectMatches) {
      const propObjectText = match.match(/{([^}]*)}/s)[1]
      const propLines = propObjectText.split(',').filter((line) => line.trim())

      for (const line of propLines) {
        // Skip empty lines
        if (!line.trim()) continue

        // Handle lines with : separator (key: value)
        const colonSplit = line.split(':').map((part) => part.trim())

        if (colonSplit.length >= 2) {
          const propName = colonSplit[0].replace(/['"`]/g, '')
          const propValue = colonSplit.slice(1).join(':').trim()

          if (propName && propName !== '') {
            props[propName] = {
              type: { name: guessTypeFromValue(propValue) },
              required: !propValue.includes('undefined'),
              description: `${propName} prop`,
            }
          }
        }
      }
    }
  }
}

/**
 * Extract props from destructuring patterns in function parameters
 */
function extractDestructuredProps(content, props) {
  // Look for destructuring assignments in function params or const statements
  const destructuringPatterns = [
    /(?:function|const)\s+\w+\s*=\s*\(\s*{\s*([^}]*)\s*}\s*\)/g,
    /const\s*{\s*([^}]*)\s*}\s*=\s*props/g,
  ]

  for (const pattern of destructuringPatterns) {
    const matches = content.matchAll(pattern)

    for (const match of matches) {
      if (!match[1]) continue

      const destructuredProps = match[1].split(',').map((p) => p.trim())

      for (const prop of destructuredProps) {
        // Skip empty props
        if (!prop) continue

        // Handle default values (prop = defaultValue)
        const [propName, defaultValue] = prop.split('=').map((p) => p.trim())

        if (propName && !props[propName]) {
          props[propName] = {
            type: { name: defaultValue ? guessTypeFromValue(defaultValue) : 'any' },
            required: !prop.includes('='),
            description: `${propName} prop`,
          }
        }
      }
    }
  }
}

/**
 * Extract props from JSX attribute assignments
 */
function extractJSXAttributes(content, props) {
  // Look for JSX attribute patterns
  const matches = content.matchAll(/<\w+\s+([^>]+)>/g)

  for (const match of matches) {
    if (!match[1]) continue

    const attributes = match[1].split(/\s+/).filter((attr) => attr.includes('='))

    for (const attr of attributes) {
      const [name, value] = attr.split('=')

      if (name && !props[name]) {
        props[name] = {
          type: { name: 'any' },
          required: false,
          description: `${name} prop`,
        }
      }
    }
  }
}

/**
 * Enhance props for specific component types based on filename or content
 */
function enhancePropsForComponentType(props, filePath) {
  const filename = path.basename(filePath)

  // Special handling for Button components
  if (filename.includes('Button') || Object.keys(props).some((p) => p.includes('button'))) {
    if (!props.buttonStyle && !props.variant) {
      props.buttonStyle = {
        type: {
          name: 'enum',
          value: ['primary', 'secondary', 'pill', 'icon-label', 'none', 'error', 'transparent'],
        },
        required: false,
        description: 'Style of the button',
        defaultValue: { value: 'primary' },
      }
    }

    if (!props.size) {
      props.size = {
        type: { name: 'enum', value: ['small', 'medium', 'large'] },
        required: false,
        description: 'Size of the button',
        defaultValue: { value: 'medium' },
      }
    }

    if (!props.disabled) {
      props.disabled = {
        type: { name: 'boolean' },
        required: false,
        description: 'Whether the button is disabled',
        defaultValue: { value: false },
      }
    }
  }

  // Add other component-specific enhancements here (Card, Input, etc.)
}

/**
 * Guess the type of a value from its string representation
 */
function guessTypeFromValue(value) {
  if (!value) return 'any'
  value = value.trim()

  if (value === 'true' || value === 'false') return 'boolean'
  if (value.match(/^['"`].*['"`]$/)) return 'string'
  if (value.match(/^\d+$/)) return 'number'
  if (value.match(/^{.*}$/)) return 'object'
  if (value.match(/^\[.*\]$/)) return 'array'
  if (value.match(/^function|^\(/)) return 'function'
  if (value.match(/^undefined$/)) return 'any'
  if (value.match(/^null$/)) return 'any'
  if (value.match(/^(React\.)?[A-Z][a-zA-Z0-9]*$/)) return 'element'

  return 'any'
}

module.exports = {
  extractPropsFromCompiledComponent,
}
