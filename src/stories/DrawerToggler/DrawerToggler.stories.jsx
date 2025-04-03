import React from 'react';
import { DrawerToggler } from '@payloadcms/ui/elements/Drawer';

/**
 * DrawerToggler component from @payloadcms/ui/dist/elements/Drawer
 */
export default {
  id: 'payloadcms-ui-elements-drawertoggler',
  title: '@payloadcms/ui/elements/Drawer',
  component: DrawerToggler,
  parameters: {
    docs: {
      description: {
        component: "DrawerToggler component from @payloadcms/ui/dist/elements/Drawer"
      
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
 * Primary template for the DrawerToggler component
 */
const Template = (args) => <DrawerToggler {...args} />;

/**
 * Default state of the DrawerToggler component
 */
export const Default = Template.bind({});
Default.args = {};
