import React from 'react';
import { IDLabel } from '@payloadcms/ui/elements/IDLabel';

/**
 * IDLabel component from @payloadcms/ui/dist/elements/IDLabel
 */
export default {
  title: '@payloadcms/ui/elements/IDLabel',
  component: IDLabel,
  parameters: {
    docs: {
      description: {
        component: "IDLabel component from @payloadcms/ui/dist/elements/IDLabel"
      }
    }
  },
  argTypes: {
  "id": {
    "description": "id prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "prefix": {
    "description": "prefix prop",
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      }
    }
  }
},
  tags: ['autodocs'],
};

/**
 * Primary template for the IDLabel component
 */
const Template = (args) => <IDLabel {...args} />;

/**
 * Default state of the IDLabel component
 */
export const Default = Template.bind({});
Default.args = {};
