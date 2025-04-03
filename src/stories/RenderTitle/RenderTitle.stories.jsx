import React from 'react';
import { RenderTitle } from '@payloadcms/ui/elements/RenderTitle';

/**
 * RenderTitle component from @payloadcms/ui/dist/elements/RenderTitle
 */
export default {
  title: '@payloadcms/ui/elements/RenderTitle',
  component: RenderTitle,
  parameters: {
    docs: {
      description: {
        component: "RenderTitle component from @payloadcms/ui/dist/elements/RenderTitle"
      }
    }
  },
  argTypes: {
  "element: t0": {
    "description": "element: t0 prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "fallback": {
    "description": "fallback prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "title: titleFromProps": {
    "description": "title: titleFromProps prop",
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
 * Primary template for the RenderTitle component
 */
const Template = (args) => <RenderTitle {...args} />;

/**
 * Default state of the RenderTitle component
 */
export const Default = Template.bind({});
Default.args = {};
