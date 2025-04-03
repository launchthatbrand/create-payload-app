import { ButtonContents } from '@payloadcms/ui/elements/Button'
import React from 'react'
import { withSafeLinks } from '../../../.storybook/mockComponentWrappers'

// Use wrapper to ensure links have href props
const SafeButtonContents = withSafeLinks(ButtonContents)

/**
 * ButtonContents component from @payloadcms/ui/dist/elements/Button
 */
export default {
  id: 'payloadcms-ui-elements-buttoncontents',
  title: '@payloadcms/ui/elements/Button',
  component: ButtonContents,
  parameters: {
    docs: {
      description: {
        component: 'ButtonContents component from @payloadcms/ui/dist/elements/Button',
      },
    },
  },
  argTypes: {
    'aria-disabled': {
      description: 'aria-disabled prop',
      table: {
        type: {
          summary: 'any',
        },
      },
    },
    'aria-label': {
      description: 'aria-label prop',
      table: {
        type: {
          summary: 'any',
        },
      },
    },
    'styleClasses].join( )': {
      description: 'styleClasses].join( ) prop',
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
    onMouseDown: {
      description: 'onMouseDown prop',
      table: {
        type: {
          summary: 'any',
        },
      },
    },
    onPointerEnter: {
      description: 'onPointerEnter prop',
      table: {
        type: {
          summary: 'any',
        },
      },
    },
    onPointerLeave: {
      description: 'onPointerLeave prop',
      table: {
        type: {
          summary: 'any',
        },
      },
    },
    rel: {
      description: 'rel prop',
      table: {
        type: {
          summary: 'any',
        },
      },
    },
    target: {
      description: 'target prop',
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
    icon: {
      description: 'icon prop',
      table: {
        type: {
          summary: 'any',
        },
      },
    },
    showTooltip: {
      description: 'showTooltip prop',
      table: {
        type: {
          summary: 'any',
        },
      },
    },
    tooltip: {
      description: 'tooltip prop',
      table: {
        type: {
          summary: 'any',
        },
      },
    },
    id: {
      description: 'id prop',
      table: {
        type: {
          summary: 'any',
        },
      },
    },
    type: {
      description: 'type prop',
      control: 'text',
      table: {
        type: {
          summary: 'string',
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
    buttonStyle: {
      description: 'buttonStyle prop',
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    disabled: {
      description: 'disabled prop',
      table: {
        type: {
          summary: 'any',
        },
      },
    },
    el: {
      description: 'el prop',
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    enableSubMenu: {
      description: 'enableSubMenu prop',
      table: {
        type: {
          summary: 'any',
        },
      },
    },
    iconPosition: {
      description: 'iconPosition prop',
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    iconStyle: {
      description: 'iconStyle prop',
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    newTab: {
      description: 'newTab prop',
      table: {
        type: {
          summary: 'any',
        },
      },
    },
    ref: {
      description: 'ref prop',
      table: {
        type: {
          summary: 'any',
        },
      },
    },
    round: {
      description: 'round prop',
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
    SubMenuPopupContent: {
      description: 'SubMenuPopupContent prop',
      table: {
        type: {
          summary: 'any',
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
    url: {
      description: 'url prop',
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
 * Primary template for the ButtonContents component
 */
const Template = (args) => <SafeButtonContents {...args} />

/**
 * Default state of the ButtonContents component
 */
export const Default = Template.bind({})
Default.args = {
  children: 'Example Content',
  href: '#',
  title: 'ButtonContents Example',
}
