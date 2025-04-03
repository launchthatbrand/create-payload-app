import React from 'react';
import { DocumentDrawerToggler } from '@payloadcms/ui/elements/DocumentDrawer';
import { withSafeLinks } from '../../../.storybook/mockComponentWrappers';


// Use wrapper to ensure links have href props
const SafeDocumentDrawerToggler = withSafeLinks(DocumentDrawerToggler);

/**
 * DocumentDrawerToggler component from @payloadcms/ui/dist/elements/DocumentDrawer
 */
export default {
  id: 'payloadcms-ui-elements-documentdrawertoggler',
  title: '@payloadcms/ui/elements/DocumentDrawer',
  component: DocumentDrawerToggler,
  parameters: {
    docs: {
      description: {
        component: "DocumentDrawerToggler component from @payloadcms/ui/dist/elements/DocumentDrawer"
      
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
  "collectionSlug": {
    "description": "collectionSlug prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
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
  "drawerSlug": {
    "description": "drawerSlug prop",
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
 * Primary template for the DocumentDrawerToggler component
 */
const Template = (args) => <SafeDocumentDrawerToggler {...args} />;

/**
 * Default state of the DocumentDrawerToggler component
 */
export const Default = Template.bind({});
Default.args = {
  "href": "#",
  "title": "DocumentDrawerToggler Example"};
