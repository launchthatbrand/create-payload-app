import React from 'react';
import { Autosave } from '@payloadcms/ui/elements/Autosave';

/**
 * Autosave component from @payloadcms/ui/dist/elements/Autosave
 */
export default {
  title: '@payloadcms/ui/elements/Autosave',
  component: Autosave,
  parameters: {
    docs: {
      description: {
        component: "Autosave component from @payloadcms/ui/dist/elements/Autosave"
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
  "collection": {
    "description": "collection prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "global: globalDoc": {
    "description": "global: globalDoc prop",
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
 * Primary template for the Autosave component
 */
const Template = (args) => <Autosave {...args} />;

/**
 * Default state of the Autosave component
 */
export const Default = Template.bind({});
Default.args = {};
