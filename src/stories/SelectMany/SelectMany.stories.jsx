import React from 'react';
import { SelectMany } from '@payloadcms/ui/elements/SelectMany';

/**
 * SelectMany component from @payloadcms/ui/dist/elements/SelectMany
 */
export default {
  title: '@payloadcms/ui/elements/SelectMany',
  component: SelectMany,
  parameters: {
    docs: {
      description: {
        component: "SelectMany component from @payloadcms/ui/dist/elements/SelectMany"
      }
    }
  },
  argTypes: {
  "onClick": {
    "description": "onClick prop",
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
 * Primary template for the SelectMany component
 */
const Template = (args) => <SelectMany {...args} />;

/**
 * Default state of the SelectMany component
 */
export const Default = Template.bind({});
Default.args = {};
