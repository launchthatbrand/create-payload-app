import React from 'react';
import { StayLoggedInModal } from '@payloadcms/ui/elements/StayLoggedIn';

/**
 * StayLoggedInModal component from @payloadcms/ui/dist/elements/StayLoggedIn
 */
export default {
  title: '@payloadcms/ui/elements/StayLoggedIn',
  component: StayLoggedInModal,
  parameters: {
    docs: {
      description: {
        component: "StayLoggedInModal component from @payloadcms/ui/dist/elements/StayLoggedIn"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the StayLoggedInModal component
 */
const Template = (args) => <StayLoggedInModal {...args} />;

/**
 * Default state of the StayLoggedInModal component
 */
export const Default = Template.bind({});
Default.args = {};
