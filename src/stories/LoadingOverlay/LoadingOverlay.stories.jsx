import React from 'react';
import { LoadingOverlay } from '@payloadcms/ui/elements/Loading';

/**
 * LoadingOverlay component from @payloadcms/ui/dist/elements/Loading
 */
export default {
  id: 'payloadcms-ui-elements-loadingoverlay',
  title: '@payloadcms/ui/elements/Loading',
  component: LoadingOverlay,
  parameters: {
    docs: {
      description: {
        component: "LoadingOverlay component from @payloadcms/ui/dist/elements/Loading"
      
}
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the LoadingOverlay component
 */
const Template = (args) => <LoadingOverlay {...args} />;

/**
 * Default state of the LoadingOverlay component
 */
export const Default = Template.bind({});
Default.args = {};
