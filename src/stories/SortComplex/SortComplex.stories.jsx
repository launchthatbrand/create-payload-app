import React from 'react';
import { SortComplex } from '@payloadcms/ui/elements/SortComplex';

/**
 * SortComplex component from @payloadcms/ui/dist/elements/SortComplex
 */
export default {
  title: '@payloadcms/ui/elements/SortComplex',
  component: SortComplex,
  parameters: {
    docs: {
      description: {
        component: "SortComplex component from @payloadcms/ui/dist/elements/SortComplex"
      }
    }
  },
  argTypes: {
  "collection": {
    "description": "collection prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "handleChange": {
    "description": "handleChange prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "modifySearchQuery: t0": {
    "description": "modifySearchQuery: t0 prop",
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
 * Primary template for the SortComplex component
 */
const Template = (args) => <SortComplex {...args} />;

/**
 * Default state of the SortComplex component
 */
export const Default = Template.bind({});
Default.args = {};
