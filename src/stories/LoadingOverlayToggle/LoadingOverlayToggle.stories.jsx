import React from 'react';
import { LoadingOverlayToggle } from '@payloadcms/ui/elements/Loading';

/**
 * LoadingOverlayToggle component from @payloadcms/ui/dist/elements/Loading
 */
export default {
  id: 'payloadcms-ui-elements-loadingoverlaytoggle',
  title: '@payloadcms/ui/elements/Loading',
  component: LoadingOverlayToggle,
  parameters: {
    docs: {
      description: {
        component: "LoadingOverlayToggle component from @payloadcms/ui/dist/elements/Loading"
      
}
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the LoadingOverlayToggle component
 */
const Template = (args) => <LoadingOverlayToggle {...args} />;

/**
 * Default state of the LoadingOverlayToggle component
 */
export const Default = Template.bind({});
Default.args = {};
