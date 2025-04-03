import React from 'react';
import { WhereBuilder } from '@payloadcms/ui/elements/WhereBuilder';

/**
 * WhereBuilder component from @payloadcms/ui/dist/elements/WhereBuilder
 */
export default {
  title: '@payloadcms/ui/elements/WhereBuilder',
  component: WhereBuilder,
  parameters: {
    docs: {
      description: {
        component: "WhereBuilder component from @payloadcms/ui/dist/elements/WhereBuilder"
      }
    }
  },
  argTypes: {
  "collectionPluralLabel": {
    "description": "collectionPluralLabel prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "fields": {
    "description": "fields prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "renderedFilters": {
    "description": "renderedFilters prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "resolvedFilterOptions": {
    "description": "resolvedFilterOptions prop",
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
 * Primary template for the WhereBuilder component
 */
const Template = (args) => <WhereBuilder {...args} />;

/**
 * Default state of the WhereBuilder component
 */
export const Default = Template.bind({});
Default.args = {};
