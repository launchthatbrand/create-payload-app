import React from 'react';
import { Translation } from '@payloadcms/ui/elements/Translation';

/**
 * Translation component from @payloadcms/ui/dist/elements/Translation
 */
export default {
  title: '@payloadcms/ui/elements/Translation',
  component: Translation,
  parameters: {
    docs: {
      description: {
        component: "Translation component from @payloadcms/ui/dist/elements/Translation"
      }
    }
  },
  argTypes: {
  "elements": {
    "description": "elements prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "translationString": {
    "description": "translationString prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "i18nKey": {
    "description": "i18nKey prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "t": {
    "description": "t prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "variables": {
    "description": "variables prop",
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
 * Primary template for the Translation component
 */
const Template = (args) => <Translation {...args} />;

/**
 * Default state of the Translation component
 */
export const Default = Template.bind({});
Default.args = {};
