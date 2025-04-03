import React from 'react';
import { Banner } from '@payloadcms/ui/elements/Banner';
import { withSafeLinks } from '../../../.storybook/mockComponentWrappers';


// Use wrapper to ensure links have href props
const SafeBanner = withSafeLinks(Banner);

/**
 * Banner component from @payloadcms/ui/dist/elements/Banner
 */
export default {
  title: '@payloadcms/ui/elements/Banner',
  component: Banner,
  parameters: {
    docs: {
      description: {
        component: "Banner component from @payloadcms/ui/dist/elements/Banner"
      }
    }
  },
  argTypes: {
  "type": {
    "description": "type prop",
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      }
    }
  },
  "alignIcon": {
    "description": "alignIcon prop",
    "control": "text",
    "table": {
      "type": {
        "summary": "string"
      }
    }
  },
  "children": {
    "description": "children prop",
    "control": "text"
  },
  "icon": {
    "description": "icon prop",
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
  "to": {
    "description": "to prop",
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
 * Primary template for the Banner component
 */
const Template = (args) => <SafeBanner {...args} />;

/**
 * Default state of the Banner component
 */
export const Default = Template.bind({});
Default.args = {
  "children": "Example Content",
  "href": "#",
  "title": "Banner Example"
};
