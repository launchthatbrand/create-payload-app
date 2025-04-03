import { Card } from '@payloadcms/ui/elements/Card'
import React from 'react'
import { withSafeLinks } from '../../../storybook/mockComponentWrappers'

// Use our wrapper to ensure links have href props
const SafeCard = withSafeLinks(Card)

/**
 * Card component from @payloadcms/ui/dist/elements/Card
 */
export default {
  title: '@payloadcms/ui/elements/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: 'Card component from @payloadcms/ui/dist/elements/Card',
      },
    },
  },
  argTypes: {
    id: {
      description: 'id prop',
      table: {
        type: {
          summary: 'any',
        },
      },
    },
    actions: {
      description: 'actions prop',
      table: {
        type: {
          summary: 'any',
        },
      },
    },
    buttonAriaLabel: {
      description: 'buttonAriaLabel prop',
      table: {
        type: {
          summary: 'any',
        },
      },
    },
    href: {
      description: 'href prop',
      table: {
        type: {
          summary: 'any',
        },
      },
    },
    onClick: {
      description: 'onClick prop',
      table: {
        type: {
          summary: 'any',
        },
      },
    },
    title: {
      description: 'title prop',
      table: {
        type: {
          summary: 'any',
        },
      },
    },
    titleAs: {
      description: 'titleAs prop',
      table: {
        type: {
          summary: 'any',
        },
      },
    },
    buttonStyle: {
      description: 'Style of the button',
      table: {
        type: {
          summary: 'enum',
        },
        defaultValue: {
          summary: 'primary',
        },
      },
    },
    size: {
      description: 'Size of the button',
      table: {
        type: {
          summary: 'enum',
        },
        defaultValue: {
          summary: 'medium',
        },
      },
    },
    disabled: {
      description: 'Whether the button is disabled',
      control: 'boolean',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: false,
        },
      },
    },
  },
  tags: ['autodocs'],
}

/**
 * Primary template for the Card component
 */
const Template = (args) => <SafeCard {...args} />

/**
 * Default state of the Card component
 */
export const Default = Template.bind({})
Default.args = {
  buttonStyle: 'primary',
  size: 'medium',
  disabled: false,
  href: '#', // Default href to prevent undefined props
  title: 'Example Card',
  children: 'This is a card with example content',
}
