import React from 'react';
import { DocumentDrawer } from '@payloadcms/ui/elements/DocumentDrawer';
import { withSafeLinks } from '../../../.storybook/mockComponentWrappers';


// Use wrapper to ensure links have href props
const SafeDocumentDrawer = withSafeLinks(DocumentDrawer);

/**
 * DocumentDrawer component from @payloadcms/ui/dist/elements/DocumentDrawer
 */
export default {
  title: '@payloadcms/ui/elements/DocumentDrawer',
  component: DocumentDrawer,
  parameters: {
    docs: {
      description: {
        component: "DocumentDrawer component from @payloadcms/ui/dist/elements/DocumentDrawer"
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
 * Primary template for the DocumentDrawer component
 */
const Template = (args) => <SafeDocumentDrawer {...args} />;

/**
 * Default state of the DocumentDrawer component
 */
export const Default = Template.bind({});
Default.args = {
  "href": "#",
  "title": "DocumentDrawer Example"};
