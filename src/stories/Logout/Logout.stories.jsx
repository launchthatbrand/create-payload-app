import React from 'react';
import { Logout } from '@payloadcms/ui/elements/Logout';

/**
 * Logout component from @payloadcms/ui/dist/elements/Logout
 */
export default {
  title: '@payloadcms/ui/elements/Logout',
  component: Logout,
  parameters: {
    docs: {
      description: {
        component: "Logout component from @payloadcms/ui/dist/elements/Logout"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the Logout component
 */
const Template = (args) => <Logout {...args} />;

/**
 * Default state of the Logout component
 */
export const Default = Template.bind({});
Default.args = {};
