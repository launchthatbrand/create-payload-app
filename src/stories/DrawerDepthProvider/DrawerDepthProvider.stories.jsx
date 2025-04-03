import React from 'react';
import { DrawerDepthProvider } from '@payloadcms/ui/elements/Drawer';

/**
 * DrawerDepthProvider component from @payloadcms/ui/dist/elements/Drawer
 */
export default {
  id: 'payloadcms-ui-elements-drawerdepthprovider',
  title: '@payloadcms/ui/elements/Drawer',
  component: DrawerDepthProvider,
  parameters: {
    docs: {
      description: {
        component: "DrawerDepthProvider component from @payloadcms/ui/dist/elements/Drawer"
      
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
 * Primary template for the DrawerDepthProvider component
 */
const Template = (args) => <DrawerDepthProvider {...args} />;

/**
 * Default state of the DrawerDepthProvider component
 */
export const Default = Template.bind({});
Default.args = {};
