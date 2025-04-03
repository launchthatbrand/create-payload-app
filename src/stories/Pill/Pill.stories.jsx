import { Pill } from '@payloadcms/ui/elements/Pill'
import React from 'react'

/**
 * Pill component from @payloadcms/ui/dist/elements/Pill
 */
export default {
  title: '@payloadcms/ui/elements/Pill',
  component: Pill,
  parameters: {
    docs: {
      description: {
        component: 'Pill component from @payloadcms/ui/dist/elements/Pill',
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
    alignIcon: {
      description: 'alignIcon prop',
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    "'aria-checked': ariaChecked": {
      description: "'aria-checked': ariaChecked prop",
      table: {
        type: {
          summary: 'any',
        },
      },
    },
    "'aria-controls': ariaControls": {
      description: "'aria-controls': ariaControls prop",
      table: {
        type: {
          summary: 'any',
        },
      },
    },
    "'aria-expanded': ariaExpanded": {
      description: "'aria-expanded': ariaExpanded prop",
      table: {
        type: {
          summary: 'any',
        },
      },
    },
    "'aria-label': ariaLabel": {
      description: "'aria-label': ariaLabel prop",
      table: {
        type: {
          summary: 'any',
        },
      },
    },
    children: {
      description: 'children prop',
      control: 'text',
    },
    draggable: {
      description: 'draggable prop',
      table: {
        type: {
          summary: 'any',
        },
      },
    },
    elementProps: {
      description: 'elementProps prop',
      table: {
        type: {
          summary: 'any',
        },
      },
    },
    icon: {
      description: 'icon prop',
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
    pillStyle: {
      description: 'pillStyle prop',
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    rounded: {
      description: 'rounded prop',
      table: {
        type: {
          summary: 'any',
        },
      },
    },
    size: {
      description: 'size prop',
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    to: {
      description: 'to prop',
      table: {
        type: {
          summary: 'any',
        },
      },
    },
  },
  tags: ['autodocs'],
}

/**
 * Primary template for the Pill component
 */
const Template = (args) => <Pill {...args} />

/**
 * Default state of the Pill component
 */
export const Default = Template.bind({})
Default.args = {
  children: 'Example Content',
}
