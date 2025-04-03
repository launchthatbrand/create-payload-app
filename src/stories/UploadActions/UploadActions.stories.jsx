import React from 'react';
import { UploadActions } from '@payloadcms/ui/elements/Upload';

/**
 * UploadActions component from @payloadcms/ui/dist/elements/Upload
 */
export default {
  id: 'payloadcms-ui-elements-uploadactions',
  title: '@payloadcms/ui/elements/Upload',
  component: UploadActions,
  parameters: {
    docs: {
      description: {
        component: "UploadActions component from @payloadcms/ui/dist/elements/Upload"
      
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
 * Primary template for the UploadActions component
 */
const Template = (args) => <UploadActions {...args} />;

/**
 * Default state of the UploadActions component
 */
export const Default = Template.bind({});
Default.args = {};
