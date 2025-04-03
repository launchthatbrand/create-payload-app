import { EmailAndUsernameFields } from '@payloadcms/ui/elements/EmailAndUsername'
import React from 'react'

/**
 * EmailAndUsernameFields component from @payloadcms/ui/dist/elements/EmailAndUsername
 */
export default {
  title: '@payloadcms/ui/elements/EmailAndUsername',
  component: EmailAndUsernameFields,
  parameters: {
    docs: {
      description: {
        component:
          'EmailAndUsernameFields component from @payloadcms/ui/dist/elements/EmailAndUsername',
      },
    },
  },
  argTypes: {
    loginWithUsername: {
      description: 'Configure username login options',
      control: { type: 'object' },
    },
    readOnly: {
      description: 'Set fields to read-only mode',
      control: { type: 'boolean' },
    },
    t: {
      description: 'Translation function',
      control: false,
    },
  },
  tags: ['autodocs'],
}

/**
 * Primary template for the EmailAndUsername component
 */
const Template = (args) => <EmailAndUsernameFields {...args} />

/**
 * Default state of the EmailAndUsernameFields component
 */
export const Default = Template.bind({})
Default.args = {
  loginWithUsername: {
    allowEmailLogin: true,
    requireEmail: true,
  },
  readOnly: false,
  t: (key) => key, // Simple translation function
}

/**
 * Only email field
 */
export const EmailOnly = Template.bind({})
EmailOnly.args = {
  loginWithUsername: false,
  readOnly: false,
  t: (key) => key,
}

/**
 * Username with optional email
 */
export const UsernameWithEmail = Template.bind({})
UsernameWithEmail.args = {
  loginWithUsername: {
    allowEmailLogin: true,
    requireEmail: false,
  },
  readOnly: false,
  t: (key) => key,
}
