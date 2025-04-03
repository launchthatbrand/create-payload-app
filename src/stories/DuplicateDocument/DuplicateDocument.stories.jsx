import React from 'react';
import { DuplicateDocument } from '@payloadcms/ui/elements/DuplicateDocument';

/**
 * DuplicateDocument component from @payloadcms/ui/dist/elements/DuplicateDocument
 */
export default {
  title: '@payloadcms/ui/elements/DuplicateDocument',
  component: DuplicateDocument,
  parameters: {
    docs: {
      description: {
        component: "DuplicateDocument component from @payloadcms/ui/dist/elements/DuplicateDocument"
      }
    }
  },
  argTypes: {
  "id": {
    "description": "id prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "slug": {
    "description": "slug prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "onDuplicate": {
    "description": "onDuplicate prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "redirectAfterDuplicate": {
    "description": "redirectAfterDuplicate prop",
    "control": "boolean",
    "table": {
      "type": {
        "summary": "boolean"
      }
    }
  },
  "singularLabel": {
    "description": "singularLabel prop",
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
 * Primary template for the DuplicateDocument component
 */
const Template = (args) => <DuplicateDocument {...args} />;

/**
 * Default state of the DuplicateDocument component
 */
export const Default = Template.bind({});
Default.args = {};
