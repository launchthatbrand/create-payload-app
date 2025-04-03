import React from 'react';
import { DeleteDocument } from '@payloadcms/ui/elements/DeleteDocument';

/**
 * DeleteDocument component from @payloadcms/ui/dist/elements/DeleteDocument
 */
export default {
  title: '@payloadcms/ui/elements/DeleteDocument',
  component: DeleteDocument,
  parameters: {
    docs: {
      description: {
        component: "DeleteDocument component from @payloadcms/ui/dist/elements/DeleteDocument"
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
  "buttonId": {
    "description": "buttonId prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "collectionSlug": {
    "description": "collectionSlug prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "onDelete": {
    "description": "onDelete prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "redirectAfterDelete": {
    "description": "redirectAfterDelete prop",
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
  },
  "title: titleFromProps": {
    "description": "title: titleFromProps prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "buttonStyle": {
    "description": "Style of the button",
    "table": {
      "type": {
        "summary": "enum"
      },
      "defaultValue": {
        "summary": "primary"
      }
    }
  },
  "size": {
    "description": "Size of the button",
    "table": {
      "type": {
        "summary": "enum"
      },
      "defaultValue": {
        "summary": "medium"
      }
    }
  },
  "disabled": {
    "description": "Whether the button is disabled",
    "control": "boolean",
    "table": {
      "type": {
        "summary": "boolean"
      },
      "defaultValue": {
        "summary": false
      }
    }
  }
},
  tags: ['autodocs'],
};

/**
 * Primary template for the DeleteDocument component
 */
const Template = (args) => <DeleteDocument {...args} />;

/**
 * Default state of the DeleteDocument component
 */
export const Default = Template.bind({});
Default.args = {
  "buttonStyle": "primary",
  "size": "medium",
  "disabled": false
};
