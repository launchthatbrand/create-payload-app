import React from 'react';
import { ViewDescription } from '@payloadcms/ui/elements/ViewDescription';

/**
 * ViewDescription component from @payloadcms/ui/dist/elements/ViewDescription
 */
export default {
  title: '@payloadcms/ui/elements/ViewDescription',
  component: ViewDescription,
  parameters: {
    docs: {
      description: {
        component: "ViewDescription component from @payloadcms/ui/dist/elements/ViewDescription"
      }
    }
  },
  argTypes: {
  "description": {
    "description": "description prop",
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
 * Primary template for the ViewDescription component
 */
const Template = (args) => <ViewDescription {...args} />;

/**
 * Default state of the ViewDescription component
 */
export const Default = Template.bind({});
Default.args = {};
