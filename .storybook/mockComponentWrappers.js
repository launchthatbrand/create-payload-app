import React from 'react'

/**
 * This file contains wrapper components for UI components that need special handling in Storybook.
 * These wrappers add default props or context that might be missing in the Storybook environment.
 */

// Wrap components that use Link internally to ensure they have href props
export const withSafeLinks = (Component) => {
  return (props) => {
    // Add any missing props that would typically come from a router context
    const safeProps = {
      ...props,
      href: props.href || '#',
      to: props.to || '#',
    }

    return <Component {...safeProps} />
  }
}

export default {
  withSafeLinks,
}
