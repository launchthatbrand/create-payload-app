import React from 'react';
import { Drawer } from '@payloadcms/ui/elements/Drawer';

/**
 * Drawer component from @payloadcms/ui/dist/elements/Drawer
 */
export default {
  title: '@payloadcms/ui/elements/Drawer',
  component: Drawer,
  parameters: {
    docs: {
      description: {
        component: "Drawer component from @payloadcms/ui/dist/elements/Drawer"
      }
    }
  },
  argTypes: {
  "slug": {
    "description": "slug prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "depth": {
    "description": "depth prop",
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
 * Primary template for the Drawer component
 */
const Template = (args) => <Drawer {...args} />;

/**
 * Default state of the Drawer component
 */
export const Default = Template.bind({});
Default.args = {};
