import React from 'react';
import { ListDrawerToggler } from '@payloadcms/ui/elements/ListDrawer';

/**
 * ListDrawerToggler component from @payloadcms/ui/dist/elements/ListDrawer
 */
export default {
  id: 'payloadcms-ui-elements-listdrawertoggler',
  title: '@payloadcms/ui/elements/ListDrawer',
  component: ListDrawerToggler,
  parameters: {
    docs: {
      description: {
        component: "ListDrawerToggler component from @payloadcms/ui/dist/elements/ListDrawer"
      
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
 * Primary template for the ListDrawerToggler component
 */
const Template = (args) => <ListDrawerToggler {...args} />;

/**
 * Default state of the ListDrawerToggler component
 */
export const Default = Template.bind({});
Default.args = {
  "children": "Example Content"
};
