import React from 'react';
import { DocumentTakeOver } from '@payloadcms/ui/elements/DocumentTakeOver';

/**
 * DocumentTakeOver component from @payloadcms/ui/dist/elements/DocumentTakeOver
 */
export default {
  title: '@payloadcms/ui/elements/DocumentTakeOver',
  component: DocumentTakeOver,
  parameters: {
    docs: {
      description: {
        component: "DocumentTakeOver component from @payloadcms/ui/dist/elements/DocumentTakeOver"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the DocumentTakeOver component
 */
const Template = (args) => <DocumentTakeOver {...args} />;

/**
 * Default state of the DocumentTakeOver component
 */
export const Default = Template.bind({});
Default.args = {};
