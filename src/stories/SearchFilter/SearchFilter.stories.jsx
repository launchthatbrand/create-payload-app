import React from 'react';
import { SearchFilter } from '@payloadcms/ui/elements/SearchFilter';

/**
 * SearchFilter component from @payloadcms/ui/dist/elements/SearchFilter
 */
export default {
  title: '@payloadcms/ui/elements/SearchFilter',
  component: SearchFilter,
  parameters: {
    docs: {
      description: {
        component: "SearchFilter component from @payloadcms/ui/dist/elements/SearchFilter"
      }
    }
  },
  argTypes: {
  "handleChange": {
    "description": "handleChange prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "initialParams": {
    "description": "initialParams prop",
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
 * Primary template for the SearchFilter component
 */
const Template = (args) => <SearchFilter {...args} />;

/**
 * Default state of the SearchFilter component
 */
export const Default = Template.bind({});
Default.args = {};
