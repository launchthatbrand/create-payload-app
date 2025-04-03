import React from 'react';
import { TimezonePicker } from '@payloadcms/ui/elements/TimezonePicker';

/**
 * TimezonePicker component from @payloadcms/ui/dist/elements/TimezonePicker
 */
export default {
  title: '@payloadcms/ui/elements/TimezonePicker',
  component: TimezonePicker,
  parameters: {
    docs: {
      description: {
        component: "TimezonePicker component from @payloadcms/ui/dist/elements/TimezonePicker"
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
  "onChange: onChangeFromProps": {
    "description": "onChange: onChangeFromProps prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "options: optionsFromProps": {
    "description": "options: optionsFromProps prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "required": {
    "description": "required prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "selectedTimezone: selectedTimezoneFromProps": {
    "description": "selectedTimezone: selectedTimezoneFromProps prop",
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
 * Primary template for the TimezonePicker component
 */
const Template = (args) => <TimezonePicker {...args} />;

/**
 * Default state of the TimezonePicker component
 */
export const Default = Template.bind({});
Default.args = {};
