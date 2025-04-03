import React from 'react';
import { Tooltip } from '@payloadcms/ui/elements/Tooltip';

/**
 * Tooltip component from @payloadcms/ui/dist/elements/Tooltip
 */
export default {
  title: '@payloadcms/ui/elements/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component: "Tooltip component from @payloadcms/ui/dist/elements/Tooltip"
      }
    }
  },
  argTypes: {
  "alignCaret: t0": {
    "description": "alignCaret: t0 prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "boundingRef": {
    "description": "boundingRef prop",
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
  "delay: t1": {
    "description": "delay: t1 prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "position: positionFromProps": {
    "description": "position: positionFromProps prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "show: t2": {
    "description": "show: t2 prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "staticPositioning: t3": {
    "description": "staticPositioning: t3 prop",
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
 * Primary template for the Tooltip component
 */
const Template = (args) => <Tooltip {...args} />;

/**
 * Default state of the Tooltip component
 */
export const Default = Template.bind({});
Default.args = {
  "children": "Example Content"
};
