import React from 'react';
import { Collapsible } from '@payloadcms/ui/elements/Collapsible';

/**
 * Collapsible component from @payloadcms/ui/dist/elements/Collapsible
 */
export default {
  title: '@payloadcms/ui/elements/Collapsible',
  component: Collapsible,
  parameters: {
    docs: {
      description: {
        component: "Collapsible component from @payloadcms/ui/dist/elements/Collapsible"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the Collapsible component
 */
const Template = (args) => <Collapsible {...args} />;

/**
 * Default state of the Collapsible component
 */
export const Default = Template.bind({});
Default.args = {};
