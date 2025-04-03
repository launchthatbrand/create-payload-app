import React from 'react';
import { Localizer } from '@payloadcms/ui/elements/Localizer';

/**
 * Localizer component from @payloadcms/ui/dist/elements/Localizer
 */
export default {
  title: '@payloadcms/ui/elements/Localizer',
  component: Localizer,
  parameters: {
    docs: {
      description: {
        component: "Localizer component from @payloadcms/ui/dist/elements/Localizer"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the Localizer component
 */
const Template = (args) => <Localizer {...args} />;

/**
 * Default state of the Localizer component
 */
export const Default = Template.bind({});
Default.args = {};
