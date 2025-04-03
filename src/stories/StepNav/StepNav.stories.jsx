import React from 'react';
import { StepNav } from '@payloadcms/ui/elements/StepNav';

/**
 * StepNav component from @payloadcms/ui/dist/elements/StepNav
 */
export default {
  title: '@payloadcms/ui/elements/StepNav',
  component: StepNav,
  parameters: {
    docs: {
      description: {
        component: "StepNav component from @payloadcms/ui/dist/elements/StepNav"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the StepNav component
 */
const Template = (args) => <StepNav {...args} />;

/**
 * Default state of the StepNav component
 */
export const Default = Template.bind({});
Default.args = {};
