import React from 'react';
import { ColumnSelector } from '@payloadcms/ui/elements/ColumnSelector';

/**
 * ColumnSelector component from @payloadcms/ui/dist/elements/ColumnSelector
 */
export default {
  title: '@payloadcms/ui/elements/ColumnSelector',
  component: ColumnSelector,
  parameters: {
    docs: {
      description: {
        component: "ColumnSelector component from @payloadcms/ui/dist/elements/ColumnSelector"
      }
    }
  },
  argTypes: {
  "collectionSlug": {
    "description": "collectionSlug prop",
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
 * Primary template for the ColumnSelector component
 */
const Template = (args) => <ColumnSelector {...args} />;

/**
 * Default state of the ColumnSelector component
 */
export const Default = Template.bind({});
Default.args = {};
