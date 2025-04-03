import React from 'react';
import { Dropzone } from '@payloadcms/ui/elements/Dropzone';

/**
 * Dropzone component from @payloadcms/ui/dist/elements/Dropzone
 */
export default {
  title: '@payloadcms/ui/elements/Dropzone',
  component: Dropzone,
  parameters: {
    docs: {
      description: {
        component: "Dropzone component from @payloadcms/ui/dist/elements/Dropzone"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the Dropzone component
 */
const Template = (args) => <Dropzone {...args} />;

/**
 * Default state of the Dropzone component
 */
export const Default = Template.bind({});
Default.args = {};
