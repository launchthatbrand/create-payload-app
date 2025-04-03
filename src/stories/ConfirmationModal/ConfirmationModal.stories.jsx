import { ConfirmationModal } from '@payloadcms/ui/elements/ConfirmationModal'
import React from 'react'

/**
 * ConfirmationModal component from @payloadcms/ui/dist/elements/ConfirmationModal
 */
export default {
  title: '@payloadcms/ui/elements/ConfirmationModal',
  component: ConfirmationModal,
  parameters: {
    docs: {
      description: {
        component:
          'ConfirmationModal component from @payloadcms/ui/dist/elements/ConfirmationModal',
      },
    },
    layout: 'centered',
  },
  argTypes: {
    body: {
      description: 'Body content of the modal',
      control: 'text',
    },
    cancelLabel: {
      description: 'Label for the cancel button',
      control: 'text',
    },
    confirmingLabel: {
      description: 'Label for the confirm button when the action is in progress',
      control: 'text',
    },
    confirmLabel: {
      description: 'Label for the confirm button',
      control: 'text',
    },
    heading: {
      description: 'Heading of the modal',
      control: 'text',
    },
    modalSlug: {
      description: 'Modal identifier',
      control: 'text',
    },
    onCancel: {
      description: 'Function to call when canceling',
      action: 'cancelled',
    },
    onConfirm: {
      description: 'Function to call when confirming',
      action: 'confirmed',
    },
  },
  tags: ['autodocs'],
}

/**
 * Primary template for the ConfirmationModal component
 */
const Template = (args) => <ConfirmationModal {...args} />

/**
 * Default state of the ConfirmationModal component
 */
export const Default = Template.bind({})
Default.args = {
  heading: 'Confirmation Required',
  body: 'Are you sure you want to proceed with this action?',
  cancelLabel: 'Cancel',
  confirmLabel: 'Confirm',
  confirmingLabel: 'Confirming...',
  modalSlug: 'confirmation-modal',
  onCancel: () => console.log('Cancelled'),
  onConfirm: () => console.log('Confirmed'),
}
