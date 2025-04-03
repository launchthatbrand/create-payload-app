import React from 'react';
import { Gutter } from '@payloadcms/ui/elements/Gutter';

/**
 * Gutter component from @payloadcms/ui/dist/elements/Gutter
 */
export default {
  title: '@payloadcms/ui/elements/Gutter',
  component: Gutter,
  parameters: {
    docs: {
      description: {
        component: "Gutter component from @payloadcms/ui/dist/elements/Gutter"
      }
    }
  },
  argTypes: {
  "children": {
    "description": "children prop",
    "control": "text"
  },
  "left": {
    "description": "left prop",
    "control": "boolean",
    "table": {
      "type": {
        "summary": "boolean"
      }
    }
  },
  "negativeLeft": {
    "description": "negativeLeft prop",
    "control": "boolean",
    "table": {
      "type": {
        "summary": "boolean"
      }
    }
  },
  "negativeRight": {
    "description": "negativeRight prop",
    "control": "boolean",
    "table": {
      "type": {
        "summary": "boolean"
      }
    }
  },
  "ref": {
    "description": "ref prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "right": {
    "description": "right prop",
    "control": "boolean",
    "table": {
      "type": {
        "summary": "boolean"
      }
    }
  }
},
  tags: ['autodocs'],
};

/**
 * Primary template for the Gutter component
 */
const Template = (args) => <Gutter {...args} />;

/**
 * Default state of the Gutter component
 */
export const Default = Template.bind({});
Default.args = {
  "children": "Example Content"
};
