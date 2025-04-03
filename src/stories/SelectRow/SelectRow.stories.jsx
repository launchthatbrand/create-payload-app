import React from 'react';
import { SelectRow } from '@payloadcms/ui/elements/SelectRow';

/**
 * SelectRow component from @payloadcms/ui/dist/elements/SelectRow
 */
export default {
  title: '@payloadcms/ui/elements/SelectRow',
  component: SelectRow,
  parameters: {
    docs: {
      description: {
        component: "SelectRow component from @payloadcms/ui/dist/elements/SelectRow"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the SelectRow component
 */
const Template = (args) => <SelectRow {...args} />;

/**
 * Default state of the SelectRow component
 */
export const Default = Template.bind({});
Default.args = {};
