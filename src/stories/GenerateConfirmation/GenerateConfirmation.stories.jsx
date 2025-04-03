import React from 'react';
import { GenerateConfirmation } from '@payloadcms/ui/elements/GenerateConfirmation';

/**
 * GenerateConfirmation component from @payloadcms/ui/dist/elements/GenerateConfirmation
 */
export default {
  title: '@payloadcms/ui/elements/GenerateConfirmation',
  component: GenerateConfirmation,
  parameters: {
    docs: {
      description: {
        component: "GenerateConfirmation component from @payloadcms/ui/dist/elements/GenerateConfirmation"
      }
    }
  },
  argTypes: {
  "highlightField": {
    "description": "highlightField prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "setKey": {
    "description": "setKey prop",
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
 * Primary template for the GenerateConfirmation component
 */
const Template = (args) => <GenerateConfirmation {...args} />;

/**
 * Default state of the GenerateConfirmation component
 */
export const Default = Template.bind({});
Default.args = {};
