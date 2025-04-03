import React from 'react';
import { Thumbnail } from '@payloadcms/ui/elements/Thumbnail';

/**
 * Thumbnail component from @payloadcms/ui/dist/elements/Thumbnail
 */
export default {
  title: '@payloadcms/ui/elements/Thumbnail',
  component: Thumbnail,
  parameters: {
    docs: {
      description: {
        component: "Thumbnail component from @payloadcms/ui/dist/elements/Thumbnail"
      }
    }
  },
  argTypes: {
  "className: t0": {
    "description": "className: t0 prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "doc: t1": {
    "description": "doc: t1 prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "fileSrc": {
    "description": "fileSrc prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "imageCacheTag": {
    "description": "imageCacheTag prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "size": {
    "description": "size prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "alt": {
    "description": "alt prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "filename": {
    "description": "filename prop",
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
 * Primary template for the Thumbnail component
 */
const Template = (args) => <Thumbnail {...args} />;

/**
 * Default state of the Thumbnail component
 */
export const Default = Template.bind({});
Default.args = {};
