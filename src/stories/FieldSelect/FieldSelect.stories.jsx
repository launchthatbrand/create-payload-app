import React from 'react';
import { FieldSelect } from '@payloadcms/ui/elements/FieldSelect';

/**
 * FieldSelect component from @payloadcms/ui/dist/elements/FieldSelect
 */
export default {
  title: '@payloadcms/ui/elements/FieldSelect',
  component: FieldSelect,
  parameters: {
    docs: {
      description: {
        component: "FieldSelect component from @payloadcms/ui/dist/elements/FieldSelect"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the FieldSelect component
 */
const Template = (args) => <FieldSelect {...args} />;

/**
 * Default state of the FieldSelect component
 */
export const Default = Template.bind({});
Default.args = {};
