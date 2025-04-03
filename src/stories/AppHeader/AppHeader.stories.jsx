import React from 'react';
import { AppHeader } from '@payloadcms/ui/elements/AppHeader';
import { withSafeLinks } from '../../../.storybook/mockComponentWrappers';


// Use wrapper to ensure links have href props
const SafeAppHeader = withSafeLinks(AppHeader);

/**
 * AppHeader component from @payloadcms/ui/dist/elements/AppHeader
 */
export default {
  title: '@payloadcms/ui/elements/AppHeader',
  component: AppHeader,
  parameters: {
    docs: {
      description: {
        component: "AppHeader component from @payloadcms/ui/dist/elements/AppHeader"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the AppHeader component
 */
const Template = (args) => <SafeAppHeader {...args} />;

/**
 * Default state of the AppHeader component
 */
export const Default = Template.bind({});
Default.args = {
  "href": "#",
  "title": "AppHeader Example"};
