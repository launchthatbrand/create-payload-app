import React from 'react';
import { Status } from '@payloadcms/ui/elements/Status';

/**
 * Status component from @payloadcms/ui/dist/elements/Status
 */
export default {
  title: '@payloadcms/ui/elements/Status',
  component: Status,
  parameters: {
    docs: {
      description: {
        component: "Status component from @payloadcms/ui/dist/elements/Status"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the Status component
 */
const Template = (args) => <Status {...args} />;

/**
 * Default state of the Status component
 */
export const Default = Template.bind({});
Default.args = {};
