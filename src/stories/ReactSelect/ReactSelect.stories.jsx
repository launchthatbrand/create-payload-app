import React from 'react';
import { ReactSelect } from '@payloadcms/ui/elements/ReactSelect';

/**
 * ReactSelect component from @payloadcms/ui/dist/elements/ReactSelect
 */
export default {
  title: '@payloadcms/ui/elements/ReactSelect',
  component: ReactSelect,
  parameters: {
    docs: {
      description: {
        component: "ReactSelect component from @payloadcms/ui/dist/elements/ReactSelect"
      }
    }
  },
  argTypes: {
  "components": {
    "description": "components prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "customProps": {
    "description": "customProps prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "disabled": {
    "description": "disabled prop",
    "control": "boolean",
    "table": {
      "type": {
        "summary": "boolean"
      }
    }
  },
  "filterOption": {
    "description": "filterOption prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "getOptionValue": {
    "description": "getOptionValue prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "isClearable": {
    "description": "isClearable prop",
    "control": "boolean",
    "table": {
      "type": {
        "summary": "boolean"
      }
    }
  },
  "isCreatable": {
    "description": "isCreatable prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "isLoading": {
    "description": "isLoading prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "isSearchable": {
    "description": "isSearchable prop",
    "control": "boolean",
    "table": {
      "type": {
        "summary": "boolean"
      }
    }
  },
  "numberOnly": {
    "description": "numberOnly prop",
    "control": "boolean",
    "table": {
      "type": {
        "summary": "boolean"
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
  "onMenuClose": {
    "description": "onMenuClose prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "onMenuOpen": {
    "description": "onMenuOpen prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "options": {
    "description": "options prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "placeholder": {
    "description": "placeholder prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "showError": {
    "description": "showError prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "value": {
    "description": "value prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "isMulti": {
    "description": "isMulti prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "isSortable": {
    "description": "isSortable prop",
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
 * Primary template for the ReactSelect component
 */
const Template = (args) => <ReactSelect {...args} />;

/**
 * Default state of the ReactSelect component
 */
export const Default = Template.bind({});
Default.args = {};
