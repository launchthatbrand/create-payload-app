import React from 'react';
import { FullscreenModal } from '@payloadcms/ui/elements/FullscreenModal';

/**
 * FullscreenModal component from @payloadcms/ui/dist/elements/FullscreenModal
 */
export default {
  title: '@payloadcms/ui/elements/FullscreenModal',
  component: FullscreenModal,
  parameters: {
    docs: {
      description: {
        component: "FullscreenModal component from @payloadcms/ui/dist/elements/FullscreenModal"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the FullscreenModal component
 */
const Template = (args) => <FullscreenModal {...args} />;

/**
 * Default state of the FullscreenModal component
 */
export const Default = Template.bind({});
Default.args = {};
