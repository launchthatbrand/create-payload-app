import React from 'react';
import { DeleteMany } from '@payloadcms/ui/elements/DeleteMany';

/**
 * DeleteMany component from @payloadcms/ui/dist/elements/DeleteMany
 */
export default {
  title: '@payloadcms/ui/elements/DeleteMany',
  component: DeleteMany,
  parameters: {
    docs: {
      description: {
        component: "DeleteMany component from @payloadcms/ui/dist/elements/DeleteMany"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the DeleteMany component
 */
const Template = (args) => <DeleteMany {...args} />;

/**
 * Default state of the DeleteMany component
 */
export const Default = Template.bind({});
Default.args = {};
