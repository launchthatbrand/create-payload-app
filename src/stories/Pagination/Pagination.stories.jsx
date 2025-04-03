import React from 'react';
import { Pagination } from '@payloadcms/ui/elements/Pagination';

/**
 * Pagination component from @payloadcms/ui/dist/elements/Pagination
 */
export default {
  title: '@payloadcms/ui/elements/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component: "Pagination component from @payloadcms/ui/dist/elements/Pagination"
      }
    }
  },
  argTypes: {
  "hasNextPage": {
    "description": "hasNextPage prop",
    "control": "boolean",
    "table": {
      "type": {
        "summary": "boolean"
      }
    }
  },
  "hasPrevPage": {
    "description": "hasPrevPage prop",
    "control": "boolean",
    "table": {
      "type": {
        "summary": "boolean"
      }
    }
  },
  "nextPage": {
    "description": "nextPage prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "numberOfNeighbors": {
    "description": "numberOfNeighbors prop",
    "control": "number",
    "table": {
      "type": {
        "summary": "number"
      }
    }
  },
  "onChange": {
    "description": "onChange prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "page: currentPage": {
    "description": "page: currentPage prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "prevPage": {
    "description": "prevPage prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "totalPages": {
    "description": "totalPages prop",
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
 * Primary template for the Pagination component
 */
const Template = (args) => <Pagination {...args} />;

/**
 * Default state of the Pagination component
 */
export const Default = Template.bind({});
Default.args = {};
