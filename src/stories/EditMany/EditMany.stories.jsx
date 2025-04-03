import React from 'react';
import { EditMany } from '@payloadcms/ui/elements/EditMany';

/**
 * EditMany component from @payloadcms/ui/dist/elements/EditMany
 */
export default {
  title: '@payloadcms/ui/elements/EditMany',
  component: EditMany,
  parameters: {
    docs: {
      description: {
        component: "EditMany component from @payloadcms/ui/dist/elements/EditMany"
      }
    }
  },
  argTypes: {
  "collection: t0": {
    "description": "collection: t0 prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  }
},
  tags: ['autodocs'],
};

/**
 * Primary template for the EditMany component
 */
const Template = (args) => <EditMany {...args} />;

/**
 * Default state of the EditMany component
 */
export const Default = Template.bind({});
Default.args = {};
