import React from 'react';
import { DocumentFields } from '@payloadcms/ui/elements/DocumentFields';

/**
 * DocumentFields component from @payloadcms/ui/dist/elements/DocumentFields
 */
export default {
  title: '@payloadcms/ui/elements/DocumentFields',
  component: DocumentFields,
  parameters: {
    docs: {
      description: {
        component: "DocumentFields component from @payloadcms/ui/dist/elements/DocumentFields"
      }
    }
  },
  argTypes: {
  "AfterFields": {
    "description": "AfterFields prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "BeforeFields": {
    "description": "BeforeFields prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "Description": {
    "description": "Description prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "docPermissions": {
    "description": "docPermissions prop",
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
  "forceSidebarWrap": {
    "description": "forceSidebarWrap prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "readOnly": {
    "description": "readOnly prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "schemaPathSegments": {
    "description": "schemaPathSegments prop",
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
 * Primary template for the DocumentFields component
 */
const Template = (args) => <DocumentFields {...args} />;

/**
 * Default state of the DocumentFields component
 */
export const Default = Template.bind({});
Default.args = {};
