/**
 * This file provides a utility to check if the PayloadCMS CSS is properly loaded in Storybook
 */

// Function to check if a CSS class has styles applied
function hasAppliedStyles(className) {
  // Create a test element
  const testElement = document.createElement('div')
  testElement.className = className
  testElement.style.position = 'absolute'
  testElement.style.left = '-9999px'
  testElement.style.top = '-9999px'
  document.body.appendChild(testElement)

  // Get computed styles
  const styles = window.getComputedStyle(testElement)

  // Check if background color is not transparent
  const hasStyles =
    styles.backgroundColor !== 'rgba(0, 0, 0, 0)' && styles.backgroundColor !== 'transparent'

  // Clean up
  document.body.removeChild(testElement)

  return {
    hasStyles,
    backgroundColor: styles.backgroundColor,
    color: styles.color,
  }
}

// Function to create a visual indicator in the Storybook UI
function createIndicator(status, details) {
  const indicator = document.createElement('div')

  // Set styles
  Object.assign(indicator.style, {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    zIndex: '9999',
    padding: '8px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    fontFamily: 'monospace',
    backgroundColor: status ? '#4CAF50' : '#F44336',
    color: 'white',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  })

  // Set content
  indicator.textContent = status ? '✅ PayloadCMS CSS Loaded' : '❌ PayloadCMS CSS Missing'

  // Add click handler to show details
  indicator.addEventListener('click', () => {
    alert(`PayloadCMS CSS Status:
    
Loaded: ${status ? 'Yes' : 'No'}
Test Button Background: ${details.buttonStyles.backgroundColor}
Test Button Color: ${details.buttonStyles.color}

Page has ${document.styleSheets.length} style sheets.
`)
  })

  // Add to body
  document.body.appendChild(indicator)

  return indicator
}

// Main debug function to run when the page loads
export function debugCSS() {
  if (typeof window === 'undefined') return

  // Wait for the DOM to be ready
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      console.log('-------- PayloadCMS CSS DEBUG --------')

      // Check button styles
      const buttonStyles = hasAppliedStyles('btn btn--style-primary')
      console.log('Button styles loaded:', buttonStyles.hasStyles)
      console.log('Button background:', buttonStyles.backgroundColor)
      console.log('Button color:', buttonStyles.color)

      // Check for PayloadCMS stylesheets
      const allStylesheets = Array.from(document.styleSheets)
      const payloadStylesheets = allStylesheets.filter((sheet) => {
        try {
          return sheet.href && sheet.href.includes('payloadcms')
        } catch (e) {
          return false
        }
      })

      console.log('Total stylesheets:', allStylesheets.length)
      console.log('PayloadCMS stylesheets:', payloadStylesheets.length)

      // Create indicator
      createIndicator(buttonStyles.hasStyles, {
        buttonStyles,
        stylesheets: {
          total: allStylesheets.length,
          payload: payloadStylesheets.length,
        },
      })

      console.log('-------- END DEBUG --------')
    }, 1000)
  })
}

export default debugCSS
