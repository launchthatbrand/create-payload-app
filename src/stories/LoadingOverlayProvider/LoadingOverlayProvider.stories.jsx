import React from 'react';
import { LoadingOverlayProvider } from '@payloadcms/ui/elements/LoadingOverlay';

/**
 * LoadingOverlayProvider component from @payloadcms/ui/dist/elements/LoadingOverlay
 */
export default {
  id: 'payloadcms-ui-elements-loadingoverlayprovider',
  title: '@payloadcms/ui/elements/LoadingOverlay',
  component: LoadingOverlayProvider,
  parameters: {
    docs: {
      description: {
        component: "LoadingOverlayProvider component from @payloadcms/ui/dist/elements/LoadingOverlay"
      
}
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the LoadingOverlayProvider component
 */
const Template = (args) => <LoadingOverlayProvider {...args} />;

/**
 * Default state of the LoadingOverlayProvider component
 */
export const Default = Template.bind({});
Default.args = {};
