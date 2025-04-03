import React from 'react';
import { Hamburger } from '@payloadcms/ui/elements/Hamburger';

/**
 * Hamburger component from @payloadcms/ui/dist/elements/Hamburger
 */
export default {
  title: '@payloadcms/ui/elements/Hamburger',
  component: Hamburger,
  parameters: {
    docs: {
      description: {
        component: "Hamburger component from @payloadcms/ui/dist/elements/Hamburger"
      }
    }
  },
  argTypes: {
  "closeIcon: t0": {
    "description": "closeIcon: t0 prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "isActive: t1": {
    "description": "isActive: t1 prop",
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
 * Primary template for the Hamburger component
 */
const Template = (args) => <Hamburger {...args} />;

/**
 * Default state of the Hamburger component
 */
export const Default = Template.bind({});
Default.args = {};
