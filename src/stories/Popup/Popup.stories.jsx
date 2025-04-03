import React from 'react';
import { Popup } from '@payloadcms/ui/elements/Popup';

/**
 * Popup component from @payloadcms/ui/dist/elements/Popup
 */
export default {
  title: '@payloadcms/ui/elements/Popup',
  component: Popup,
  parameters: {
    docs: {
      description: {
        component: "Popup component from @payloadcms/ui/dist/elements/Popup"
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
  "boundingRef": {
    "description": "boundingRef prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "button": {
    "description": "button prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "buttonClassName": {
    "description": "buttonClassName prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "buttonSize": {
    "description": "buttonSize prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "buttonType": {
    "description": "buttonType prop",
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      }
    }
  },
  "caret": {
    "description": "caret prop",
    "control": "boolean",
    "table": {
      "type": {
        "summary": "boolean"
      }
    }
  },
  "children": {
    "description": "children prop",
    "control": "text"
  },
  "disabled": {
    "description": "disabled prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "forceOpen": {
    "description": "forceOpen prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "horizontalAlign: horizontalAlignFromProps": {
    "description": "horizontalAlign: horizontalAlignFromProps prop",
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      }
    }
  },
  "initActive": {
    "description": "initActive prop",
    "control": "boolean",
    "table": {
      "type": {
        "summary": "boolean"
      }
    }
  },
  "noBackground": {
    "description": "noBackground prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "onToggleOpen": {
    "description": "onToggleOpen prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "render": {
    "description": "render prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "showOnHover": {
    "description": "showOnHover prop",
    "control": "boolean",
    "table": {
      "type": {
        "summary": "boolean"
      }
    }
  },
  "showScrollbar": {
    "description": "showScrollbar prop",
    "control": "boolean",
    "table": {
      "type": {
        "summary": "boolean"
      }
    }
  },
  "size": {
    "description": "size prop",
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      }
    }
  },
  "verticalAlign: verticalAlignFromProps": {
    "description": "verticalAlign: verticalAlignFromProps prop",
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
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
  }
},
  tags: ['autodocs'],
};

/**
 * Primary template for the Popup component
 */
const Template = (args) => <Popup {...args} />;

/**
 * Default state of the Popup component
 */
export const Default = Template.bind({});
Default.args = {
  "children": "Example Content",
  "buttonStyle": "primary"
};
