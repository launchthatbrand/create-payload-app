import React from 'react';
import { DatePickerField } from '@payloadcms/ui/elements/DatePicker';

/**
 * DatePickerField component from @payloadcms/ui/dist/elements/DatePicker
 */
export default {
  title: '@payloadcms/ui/elements/DatePicker',
  component: DatePickerField,
  parameters: {
    docs: {
      description: {
        component: "DatePickerField component from @payloadcms/ui/dist/elements/DatePicker"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the DatePickerField component
 */
const Template = (args) => <DatePickerField {...args} />;

/**
 * Default state of the DatePickerField component
 */
export const Default = Template.bind({});
Default.args = {};
