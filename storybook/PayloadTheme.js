import React from 'react'

/**
 * PayloadTheme component - Creates a proper environment for PayloadCMS UI components
 * This simulates how components would be used in a real Payload application
 */
export const PayloadTheme = ({ children }) => {
  // Set up any global context or state needed by Payload components
  React.useEffect(() => {
    // Add Payload classes to body for proper styling
    document.body.classList.add('payload')

    return () => {
      document.body.classList.remove('payload')
    }
  }, [])

  return (
    <div className="payload">
      <div className="payload__wrapper">
        <div className="payload__body">
          <main className="payload__main">
            <div className="payload__content">
              <div className="collection-edit">
                <div className="collection-edit__content">
                  <div className="field-type">{children}</div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

// Decorator for Storybook
export const withPayloadTheme = (Story) => {
  return (
    <PayloadTheme>
      <Story />
    </PayloadTheme>
  )
}

export default withPayloadTheme
