import React from 'react';
import { SelectAll } from '@payloadcms/ui/elements/SelectAll';

/**
 * SelectAll component from @payloadcms/ui/dist/elements/SelectAll
 */
export default {
  title: '@payloadcms/ui/elements/SelectAll',
  component: SelectAll,
  parameters: {
    docs: {
      description: {
        component: "SelectAll component from @payloadcms/ui/dist/elements/SelectAll"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the SelectAll component
 */
const Template = (args) => <SelectAll {...args} />;

/**
 * Default state of the SelectAll component
 */
export const Default = Template.bind({});
Default.args = {};
