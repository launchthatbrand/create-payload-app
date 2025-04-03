import React from 'react';
import { CopyToClipboard } from '@payloadcms/ui/elements/CopyToClipboard';

/**
 * CopyToClipboard component from @payloadcms/ui/dist/elements/CopyToClipboard
 */
export default {
  title: '@payloadcms/ui/elements/CopyToClipboard',
  component: CopyToClipboard,
  parameters: {
    docs: {
      description: {
        component: "CopyToClipboard component from @payloadcms/ui/dist/elements/CopyToClipboard"
      }
    }
  },
  argTypes: {
  "defaultMessage": {
    "description": "defaultMessage prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "successMessage": {
    "description": "successMessage prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "value": {
    "description": "value prop",
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
 * Primary template for the CopyToClipboard component
 */
const Template = (args) => <CopyToClipboard {...args} />;

/**
 * Default state of the CopyToClipboard component
 */
export const Default = Template.bind({});
Default.args = {};
