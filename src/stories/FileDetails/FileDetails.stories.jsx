import React from 'react';
import { FileDetails } from '@payloadcms/ui/elements/FileDetails';

/**
 * FileDetails component from @payloadcms/ui/dist/elements/FileDetails
 */
export default {
  title: '@payloadcms/ui/elements/FileDetails',
  component: FileDetails,
  parameters: {
    docs: {
      description: {
        component: "FileDetails component from @payloadcms/ui/dist/elements/FileDetails"
      }
    }
  },
  argTypes: {
  "hasMany": {
    "description": "hasMany prop",
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
 * Primary template for the FileDetails component
 */
const Template = (args) => <FileDetails {...args} />;

/**
 * Default state of the FileDetails component
 */
export const Default = Template.bind({});
Default.args = {};
