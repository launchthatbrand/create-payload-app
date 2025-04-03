import React from 'react';
import { SaveButton } from '@payloadcms/ui/elements/SaveButton';
import { withSafeLinks } from '../../../.storybook/mockComponentWrappers';


// Use wrapper to ensure links have href props
const SafeSaveButton = withSafeLinks(SaveButton);

/**
 * SaveButton component from @payloadcms/ui/dist/elements/SaveButton
 */
export default {
  title: '@payloadcms/ui/elements/SaveButton',
  component: SaveButton,
  parameters: {
    docs: {
      description: {
        component: "SaveButton component from @payloadcms/ui/dist/elements/SaveButton"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the SaveButton component
 */
const Template = (args) => <SafeSaveButton {...args} />;

/**
 * Default state of the SaveButton component
 */
export const Default = Template.bind({});
Default.args = {
  "href": "#",
  "title": "SaveButton Example"};
