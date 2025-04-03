import React from 'react';
import { ListDrawer } from '@payloadcms/ui/elements/ListDrawer';

/**
 * ListDrawer component from @payloadcms/ui/dist/elements/ListDrawer
 */
export default {
  title: '@payloadcms/ui/elements/ListDrawer',
  component: ListDrawer,
  parameters: {
    docs: {
      description: {
        component: "ListDrawer component from @payloadcms/ui/dist/elements/ListDrawer"
      }
    }
  },
  argTypes: {
  "depth": {
    "description": "depth prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "uuid": {
    "description": "uuid prop",
    "table": {
      "type": {
        "summary": "any"
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
  "drawerSlug": {
    "description": "drawerSlug prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "onClick": {
    "description": "onClick prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "...rest": {
    "description": "...rest prop",
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
 * Primary template for the ListDrawer component
 */
const Template = (args) => <ListDrawer {...args} />;

/**
 * Default state of the ListDrawer component
 */
export const Default = Template.bind({});
Default.args = {
  "children": "Example Content"
};
