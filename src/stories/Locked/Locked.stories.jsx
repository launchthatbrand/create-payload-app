import React from 'react';
import { Locked } from '@payloadcms/ui/elements/Locked';

/**
 * Locked component from @payloadcms/ui/dist/elements/Locked
 */
export default {
  title: '@payloadcms/ui/elements/Locked',
  component: Locked,
  parameters: {
    docs: {
      description: {
        component: "Locked component from @payloadcms/ui/dist/elements/Locked"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the Locked component
 */
const Template = (args) => <Locked {...args} />;

/**
 * Default state of the Locked component
 */
export const Default = Template.bind({});
Default.args = {};
