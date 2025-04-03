import React from 'react';
import { PreviewButton } from '@payloadcms/ui/elements/PreviewButton';
import { withSafeLinks } from '../../../.storybook/mockComponentWrappers';


// Use wrapper to ensure links have href props
const SafePreviewButton = withSafeLinks(PreviewButton);

/**
 * PreviewButton component from @payloadcms/ui/dist/elements/PreviewButton
 */
export default {
  title: '@payloadcms/ui/elements/PreviewButton',
  component: PreviewButton,
  parameters: {
    docs: {
      description: {
        component: "PreviewButton component from @payloadcms/ui/dist/elements/PreviewButton"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the PreviewButton component
 */
const Template = (args) => <SafePreviewButton {...args} />;

/**
 * Default state of the PreviewButton component
 */
export const Default = Template.bind({});
Default.args = {
  "href": "#",
  "title": "PreviewButton Example"};
