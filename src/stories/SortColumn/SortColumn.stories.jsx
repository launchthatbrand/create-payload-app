import React from 'react';
import { SortColumn } from '@payloadcms/ui/elements/SortColumn';

/**
 * SortColumn component from @payloadcms/ui/dist/elements/SortColumn
 */
export default {
  title: '@payloadcms/ui/elements/SortColumn',
  component: SortColumn,
  parameters: {
    docs: {
      description: {
        component: "SortColumn component from @payloadcms/ui/dist/elements/SortColumn"
      }
    }
  },
  argTypes: {
  "name": {
    "description": "name prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "appearance": {
    "description": "appearance prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "disable: t0": {
    "description": "disable: t0 prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "Label": {
    "description": "Label prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "label": {
    "description": "label prop",
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
 * Primary template for the SortColumn component
 */
const Template = (args) => <SortColumn {...args} />;

/**
 * Default state of the SortColumn component
 */
export const Default = Template.bind({});
Default.args = {};
