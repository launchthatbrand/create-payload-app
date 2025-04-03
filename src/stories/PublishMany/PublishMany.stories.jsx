import React from 'react';
import { PublishMany } from '@payloadcms/ui/elements/PublishMany';

/**
 * PublishMany component from @payloadcms/ui/dist/elements/PublishMany
 */
export default {
  title: '@payloadcms/ui/elements/PublishMany',
  component: PublishMany,
  parameters: {
    docs: {
      description: {
        component: "PublishMany component from @payloadcms/ui/dist/elements/PublishMany"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the PublishMany component
 */
const Template = (args) => <PublishMany {...args} />;

/**
 * Default state of the PublishMany component
 */
export const Default = Template.bind({});
Default.args = {};
