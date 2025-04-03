import React from 'react';
import { UnpublishMany } from '@payloadcms/ui/elements/UnpublishMany';

/**
 * UnpublishMany component from @payloadcms/ui/dist/elements/UnpublishMany
 */
export default {
  title: '@payloadcms/ui/elements/UnpublishMany',
  component: UnpublishMany,
  parameters: {
    docs: {
      description: {
        component: "UnpublishMany component from @payloadcms/ui/dist/elements/UnpublishMany"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the UnpublishMany component
 */
const Template = (args) => <UnpublishMany {...args} />;

/**
 * Default state of the UnpublishMany component
 */
export const Default = Template.bind({});
Default.args = {};
