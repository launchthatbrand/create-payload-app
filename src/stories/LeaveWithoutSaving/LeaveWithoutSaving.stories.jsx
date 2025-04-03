import React from 'react';
import { LeaveWithoutSaving } from '@payloadcms/ui/elements/LeaveWithoutSaving';

/**
 * LeaveWithoutSaving component from @payloadcms/ui/dist/elements/LeaveWithoutSaving
 */
export default {
  title: '@payloadcms/ui/elements/LeaveWithoutSaving',
  component: LeaveWithoutSaving,
  parameters: {
    docs: {
      description: {
        component: "LeaveWithoutSaving component from @payloadcms/ui/dist/elements/LeaveWithoutSaving"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the LeaveWithoutSaving component
 */
const Template = (args) => <LeaveWithoutSaving {...args} />;

/**
 * Default state of the LeaveWithoutSaving component
 */
export const Default = Template.bind({});
Default.args = {};
