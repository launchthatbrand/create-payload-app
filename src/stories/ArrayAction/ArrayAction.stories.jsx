import React from 'react';
import { ArrayAction } from '@payloadcms/ui/elements/ArrayAction';

/**
 * ArrayAction component from @payloadcms/ui/dist/elements/ArrayAction
 */
export default {
  title: '@payloadcms/ui/elements/ArrayAction',
  component: ArrayAction,
  parameters: {
    docs: {
      description: {
        component: "ArrayAction component from @payloadcms/ui/dist/elements/ArrayAction"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the ArrayAction component
 */
const Template = (args) => <ArrayAction {...args} />;

/**
 * Default state of the ArrayAction component
 */
export const Default = Template.bind({});
Default.args = {};
