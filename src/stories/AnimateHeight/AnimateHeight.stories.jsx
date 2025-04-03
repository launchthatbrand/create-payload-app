import React from 'react';
import { AnimateHeight } from '@payloadcms/ui/elements/AnimateHeight';

/**
 * AnimateHeight component from @payloadcms/ui/dist/elements/AnimateHeight
 */
export default {
  title: '@payloadcms/ui/elements/AnimateHeight',
  component: AnimateHeight,
  parameters: {
    docs: {
      description: {
        component: "AnimateHeight component from @payloadcms/ui/dist/elements/AnimateHeight"
      }
    }
  },
  argTypes: {
  "id": {
    "description": "id prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "children": {
    "description": "children prop",
    "control": "text"
  },
  "duration": {
    "description": "duration prop",
    "control": "number",
    "table": {
      "type": {
        "summary": "number"
      }
    }
  },
  "height": {
    "description": "height prop",
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
 * Primary template for the AnimateHeight component
 */
const Template = (args) => <AnimateHeight {...args} />;

/**
 * Default state of the AnimateHeight component
 */
export const Default = Template.bind({});
Default.args = {
  "children": "Example Content"
};
