import React from 'react';
import { Table } from '@payloadcms/ui/elements/Table';

/**
 * Table component from @payloadcms/ui/dist/elements/Table
 */
export default {
  title: '@payloadcms/ui/elements/Table',
  component: Table,
  parameters: {
    docs: {
      description: {
        component: "Table component from @payloadcms/ui/dist/elements/Table"
      }
    }
  },
  argTypes: {
  "appearance": {
    "description": "appearance prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "columns": {
    "description": "columns prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "data": {
    "description": "data prop",
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
 * Primary template for the Table component
 */
const Template = (args) => <Table {...args} />;

/**
 * Default state of the Table component
 */
export const Default = Template.bind({});
Default.args = {};
