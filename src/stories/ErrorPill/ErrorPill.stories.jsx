import React from 'react';
import { ErrorPill } from '@payloadcms/ui/elements/ErrorPill';

/**
 * ErrorPill component from @payloadcms/ui/dist/elements/ErrorPill
 */
export default {
  title: '@payloadcms/ui/elements/ErrorPill',
  component: ErrorPill,
  parameters: {
    docs: {
      description: {
        component: "ErrorPill component from @payloadcms/ui/dist/elements/ErrorPill"
      }
    }
  },
  argTypes: {
  "count": {
    "description": "count prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "i18n": {
    "description": "i18n prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "withMessage": {
    "description": "withMessage prop",
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
 * Primary template for the ErrorPill component
 */
const Template = (args) => <ErrorPill {...args} />;

/**
 * Default state of the ErrorPill component
 */
export const Default = Template.bind({});
Default.args = {};
