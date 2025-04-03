import React from 'react';
import { DrawerDepthContext } from '@payloadcms/ui/elements/Drawer';

/**
 * DrawerDepthContext component from @payloadcms/ui/dist/elements/Drawer
 */
export default {
  id: 'payloadcms-ui-elements-drawerdepthcontext',
  title: '@payloadcms/ui/elements/Drawer',
  component: DrawerDepthContext,
  parameters: {
    docs: {
      description: {
        component: "DrawerDepthContext component from @payloadcms/ui/dist/elements/Drawer"
      
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
 * Primary template for the DrawerDepthContext component
 */
const Template = (args) => <DrawerDepthContext {...args} />;

/**
 * Default state of the DrawerDepthContext component
 */
export const Default = Template.bind({});
Default.args = {};
