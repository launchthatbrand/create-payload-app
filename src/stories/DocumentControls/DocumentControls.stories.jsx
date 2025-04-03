import React from 'react';
import { DocumentControls } from '@payloadcms/ui/elements/DocumentControls';

/**
 * DocumentControls component from @payloadcms/ui/dist/elements/DocumentControls
 */
export default {
  title: '@payloadcms/ui/elements/DocumentControls',
  component: DocumentControls,
  parameters: {
    docs: {
      description: {
        component: "DocumentControls component from @payloadcms/ui/dist/elements/DocumentControls"
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
  "customComponents: t0": {
    "description": "customComponents: t0 prop",
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
  },
  "disableActions": {
    "description": "disableActions prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "disableCreate": {
    "description": "disableCreate prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "hasSavePermission": {
    "description": "hasSavePermission prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "isAccountView": {
    "description": "isAccountView prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "isEditing": {
    "description": "isEditing prop",
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
  "onDrawerCreateNew": {
    "description": "onDrawerCreateNew prop",
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
  "onTakeOver": {
    "description": "onTakeOver prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "permissions": {
    "description": "permissions prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "readOnlyForIncomingUser": {
    "description": "readOnlyForIncomingUser prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "redirectAfterDelete": {
    "description": "redirectAfterDelete prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "redirectAfterDuplicate": {
    "description": "redirectAfterDuplicate prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "user": {
    "description": "user prop",
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
 * Primary template for the DocumentControls component
 */
const Template = (args) => <DocumentControls {...args} />;

/**
 * Default state of the DocumentControls component
 */
export const Default = Template.bind({});
Default.args = {};
