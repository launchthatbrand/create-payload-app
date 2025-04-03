import React, { useEffect, useState } from 'react'

import { Button } from '@payloadcms/ui/elements/Button'

/**
 * CSS Test component to verify that PayloadCMS styles are correctly loaded
 */
export default {
  title: '@payloadcms/ui/CSSTest',
  component: () => null,
  parameters: {
    docs: {
      description: {
        component: 'Test component to verify that PayloadCMS CSS is loaded properly',
      },
    },
  },
}

/**
 * Test for button styles - displays various button styles
 */
export const ButtonStylesTest = () => {
  const [cssLoaded, setCssLoaded] = useState(null)

  // Helper to check if styles are applied
  const checkStyles = (className) => {
    const testEl = document.createElement('div')
    testEl.className = className
    testEl.style.position = 'absolute'
    testEl.style.left = '-9999px'
    document.body.appendChild(testEl)

    const styles = window.getComputedStyle(testEl)
    const result = {
      backgroundColor: styles.backgroundColor,
      color: styles.color,
      borderColor: styles.borderColor,
      hasStyles:
        styles.backgroundColor !== 'rgba(0, 0, 0, 0)' && styles.backgroundColor !== 'transparent',
    }

    document.body.removeChild(testEl)
    return result
  }

  useEffect(() => {
    // Check if button styles are applied
    const styles = checkStyles('btn btn--style-primary')
    setCssLoaded(styles.hasStyles)
  }, [])

  return (
    <div>
      <h2>CSS Loading Test</h2>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '10px' }}>
          <p>
            <strong>CSS Status:</strong>{' '}
            {cssLoaded === null ? 'Checking...' : cssLoaded ? '✅ Loaded' : '❌ Not Loaded'}
          </p>
        </div>
      </div>

      <h3>Button Variants</h3>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Button buttonStyle="primary">Primary Button</Button>
        <Button buttonStyle="secondary">Secondary Button</Button>
        <Button buttonStyle="danger">Danger Button</Button>
      </div>

      <h3>Button Sizes</h3>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Button buttonStyle="primary" size="small">
          Small Button
        </Button>
        <Button buttonStyle="primary" size="medium">
          Medium Button
        </Button>
        <Button buttonStyle="primary" size="large">
          Large Button
        </Button>
      </div>

      <h3>Button States</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button buttonStyle="primary">Normal Button</Button>
        <Button buttonStyle="primary" disabled>
          Disabled Button
        </Button>
      </div>

      <h3>Raw HTML Button (For Comparison)</h3>
      <button style={{ margin: '10px 0' }}>Plain HTML Button</button>
    </div>
  )
}

/**
 * CSS Test with direct class names
 */
export const DirectClassTest = () => {
  return (
    <div>
      <h2>Direct CSS Class Application Test</h2>

      <p>The buttons below have PayloadCMS classes applied directly to HTML elements:</p>

      <div className="btn btn--style-primary" style={{ display: 'inline-block', margin: '5px' }}>
        Primary Button Class
      </div>

      <div className="btn btn--style-secondary" style={{ display: 'inline-block', margin: '5px' }}>
        Secondary Button Class
      </div>

      <div className="btn btn--style-danger" style={{ display: 'inline-block', margin: '5px' }}>
        Danger Button Class
      </div>
    </div>
  )
}
