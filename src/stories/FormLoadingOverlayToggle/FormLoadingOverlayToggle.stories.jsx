import React from 'react';
import { FormLoadingOverlayToggle } from '@payloadcms/ui/elements/Loading';

/**
 * FormLoadingOverlayToggle component from @payloadcms/ui/dist/elements/Loading
 */
export default {
  title: '@payloadcms/ui/elements/Loading',
  component: FormLoadingOverlayToggle,
  parameters: {
    docs: {
      description: {
        component: "FormLoadingOverlayToggle component from @payloadcms/ui/dist/elements/Loading"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the FormLoadingOverlayToggle component
 */
const Template = (args) => <FormLoadingOverlayToggle {...args} />;

/**
 * Default state of the FormLoadingOverlayToggle component
 */
export const Default = Template.bind({});
Default.args = {};
