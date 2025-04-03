import React from 'react';
import { PublishButton } from '@payloadcms/ui/elements/PublishButton';
import { withSafeLinks } from '../../../.storybook/mockComponentWrappers';


// Use wrapper to ensure links have href props
const SafePublishButton = withSafeLinks(PublishButton);

/**
 * PublishButton component from @payloadcms/ui/dist/elements/PublishButton
 */
export default {
  title: '@payloadcms/ui/elements/PublishButton',
  component: PublishButton,
  parameters: {
    docs: {
      description: {
        component: "PublishButton component from @payloadcms/ui/dist/elements/PublishButton"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the PublishButton component
 */
const Template = (args) => <SafePublishButton {...args} />;

/**
 * Default state of the PublishButton component
 */
export const Default = Template.bind({});
Default.args = {
  "href": "#",
  "title": "PublishButton Example"};
