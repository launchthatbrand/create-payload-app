import React from 'react';
import { ListControls } from '@payloadcms/ui/elements/ListControls';

/**
 * ListControls component from @payloadcms/ui/dist/elements/ListControls
 */
export default {
  title: '@payloadcms/ui/elements/ListControls',
  component: ListControls,
  parameters: {
    docs: {
      description: {
        component: "ListControls component from @payloadcms/ui/dist/elements/ListControls"
      }
    }
  },
  argTypes: {
  "beforeActions": {
    "description": "beforeActions prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "collectionConfig": {
    "description": "collectionConfig prop",
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
  "disableQueryPresets": {
    "description": "disableQueryPresets prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "enableColumns": {
    "description": "enableColumns prop",
    "control": "boolean",
    "table": {
      "type": {
        "summary": "boolean"
      }
    }
  },
  "enableSort": {
    "description": "enableSort prop",
    "control": "boolean",
    "table": {
      "type": {
        "summary": "boolean"
      }
    }
  },
  "listMenuItems: listMenuItemsFromProps": {
    "description": "listMenuItems: listMenuItemsFromProps prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "queryPreset: activePreset": {
    "description": "queryPreset: activePreset prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "queryPresetPermissions": {
    "description": "queryPresetPermissions prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "renderedFilters": {
    "description": "renderedFilters prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "resolvedFilterOptions": {
    "description": "resolvedFilterOptions prop",
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
 * Primary template for the ListControls component
 */
const Template = (args) => <ListControls {...args} />;

/**
 * Default state of the ListControls component
 */
export const Default = Template.bind({});
Default.args = {};
