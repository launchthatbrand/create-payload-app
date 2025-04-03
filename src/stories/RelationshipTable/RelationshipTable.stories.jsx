import React from 'react';
import { RelationshipTable } from '@payloadcms/ui/elements/RelationshipTable';

/**
 * RelationshipTable component from @payloadcms/ui/dist/elements/RelationshipTable
 */
export default {
  title: '@payloadcms/ui/elements/RelationshipTable',
  component: RelationshipTable,
  parameters: {
    docs: {
      description: {
        component: "RelationshipTable component from @payloadcms/ui/dist/elements/RelationshipTable"
      }
    }
  },
  argTypes: {
  "AfterInput": {
    "description": "AfterInput prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "allowCreate": {
    "description": "allowCreate prop",
    "control": "boolean",
    "table": {
      "type": {
        "summary": "boolean"
      }
    }
  },
  "BeforeInput": {
    "description": "BeforeInput prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "disableTable": {
    "description": "disableTable prop",
    "control": "boolean",
    "table": {
      "type": {
        "summary": "boolean"
      }
    }
  },
  "field": {
    "description": "field prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "filterOptions": {
    "description": "filterOptions prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "initialData: initialDataFromProps": {
    "description": "initialData: initialDataFromProps prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "initialDrawerData": {
    "description": "initialDrawerData prop",
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
  "parent": {
    "description": "parent prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "relationTo": {
    "description": "relationTo prop",
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
 * Primary template for the RelationshipTable component
 */
const Template = (args) => <RelationshipTable {...args} />;

/**
 * Default state of the RelationshipTable component
 */
export const Default = Template.bind({});
Default.args = {};
