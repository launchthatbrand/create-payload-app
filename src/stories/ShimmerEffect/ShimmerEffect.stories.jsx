import React from 'react';
import { ShimmerEffect } from '@payloadcms/ui/elements/ShimmerEffect';

/**
 * ShimmerEffect component from @payloadcms/ui/dist/elements/ShimmerEffect
 */
export default {
  title: '@payloadcms/ui/elements/ShimmerEffect',
  component: ShimmerEffect,
  parameters: {
    docs: {
      description: {
        component: "ShimmerEffect component from @payloadcms/ui/dist/elements/ShimmerEffect"
      }
    }
  },
  argTypes: {
  "animationDelay": {
    "description": "animationDelay prop",
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      }
    }
  },
  "height": {
    "description": "height prop",
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      }
    }
  },
  "width": {
    "description": "width prop",
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      }
    }
  }
},
  tags: ['autodocs'],
};

/**
 * Primary template for the ShimmerEffect component
 */
const Template = (args) => <ShimmerEffect {...args} />;

/**
 * Default state of the ShimmerEffect component
 */
export const Default = Template.bind({});
Default.args = {};
