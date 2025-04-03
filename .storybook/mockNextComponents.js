import React from 'react'

/**
 * Mock Link component for Next.js
 * This provides a functional mock of the Next.js Link component
 * for use in Storybook with PayloadCMS UI components
 */
export const Link = React.forwardRef(
  (
    {
      href = '#',
      as,
      replace,
      scroll,
      shallow,
      passHref,
      prefetch,
      locale,
      legacyBehavior,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const handleClick = (e) => {
      if (props.onClick) {
        props.onClick(e)
      }
      // Prevent navigation in Storybook
      e.preventDefault()
    }

    // Support for both children as props or direct children
    const content = typeof children === 'function' ? children({ href, isActive: false }) : children

    return (
      <a ref={ref} href={href} className={className} {...props} onClick={handleClick}>
        {content}
      </a>
    )
  },
)

Link.displayName = 'Link'

// Export default implementation to match Next.js module structure
export default Link
