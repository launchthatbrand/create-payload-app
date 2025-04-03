import React from 'react';
import { Upload } from '@payloadcms/ui/elements/Upload';

/**
 * Upload component from @payloadcms/ui/dist/elements/Upload
 */
export default {
  title: '@payloadcms/ui/elements/Upload',
  component: Upload,
  parameters: {
    docs: {
      description: {
        component: "Upload component from @payloadcms/ui/dist/elements/Upload"
      }
    }
  },
  argTypes: {
  "collectionSlug": {
    "description": "collectionSlug prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "customActions": {
    "description": "customActions prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "initialState": {
    "description": "initialState prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "onChange": {
    "description": "onChange prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "uploadConfig": {
    "description": "uploadConfig prop",
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
 * Primary template for the Upload component
 */
const Template = (args) => <Upload {...args} />;

/**
 * Default state of the Upload component
 */
export const Default = Template.bind({});
Default.args = {};
