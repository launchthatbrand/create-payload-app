import React from 'react';
import { Link } from '@payloadcms/ui/elements/Link';

/**
 * Link component from @payloadcms/ui/dist/elements/Link
 */
export default {
  title: '@payloadcms/ui/elements/Link',
  component: Link,
  parameters: {
    docs: {
      description: {
        component: "Link component from @payloadcms/ui/dist/elements/Link"
      }
    }
  },
  argTypes: {
  "children": {
    "description": "children prop",
    "control": "text"
  },
  "href": {
    "description": "href prop",
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
  "preventDefault": {
    "description": "preventDefault prop",
    "control": "boolean",
    "table": {
      "type": {
        "summary": "boolean"
      }
    }
  },
  "ref": {
    "description": "ref prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "replace": {
    "description": "replace prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "scroll": {
    "description": "scroll prop",
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
 * Primary template for the Link component
 */
const Template = (args) => <Link {...args} />;

/**
 * Default state of the Link component
 */
export const Default = Template.bind({});
Default.args = {
  "children": "Example Content"
};
