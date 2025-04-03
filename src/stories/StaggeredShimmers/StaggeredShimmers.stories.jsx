import React from 'react';
import { StaggeredShimmers } from '@payloadcms/ui/elements/ShimmerEffect';

/**
 * StaggeredShimmers component from @payloadcms/ui/dist/elements/ShimmerEffect
 */
export default {
  id: 'payloadcms-ui-elements-staggeredshimmers',
  title: '@payloadcms/ui/elements/ShimmerEffect',
  component: StaggeredShimmers,
  parameters: {
    docs: {
      description: {
        component: "StaggeredShimmers component from @payloadcms/ui/dist/elements/ShimmerEffect"
      
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
 * Primary template for the StaggeredShimmers component
 */
const Template = (args) => <StaggeredShimmers {...args} />;

/**
 * Default state of the StaggeredShimmers component
 */
export const Default = Template.bind({});
Default.args = {};
