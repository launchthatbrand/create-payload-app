import React from 'react';
import { SaveDraftButton } from '@payloadcms/ui/elements/SaveDraftButton';
import { withSafeLinks } from '../../../.storybook/mockComponentWrappers';


// Use wrapper to ensure links have href props
const SafeSaveDraftButton = withSafeLinks(SaveDraftButton);

/**
 * SaveDraftButton component from @payloadcms/ui/dist/elements/SaveDraftButton
 */
export default {
  title: '@payloadcms/ui/elements/SaveDraftButton',
  component: SaveDraftButton,
  parameters: {
    docs: {
      description: {
        component: "SaveDraftButton component from @payloadcms/ui/dist/elements/SaveDraftButton"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the SaveDraftButton component
 */
const Template = (args) => <SafeSaveDraftButton {...args} />;

/**
 * Default state of the SaveDraftButton component
 */
export const Default = Template.bind({});
Default.args = {
  "href": "#",
  "title": "SaveDraftButton Example"};
