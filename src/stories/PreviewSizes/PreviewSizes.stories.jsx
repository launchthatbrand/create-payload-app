import React from 'react';
import { PreviewSizes } from '@payloadcms/ui/elements/PreviewSizes';

/**
 * PreviewSizes component from @payloadcms/ui/dist/elements/PreviewSizes
 */
export default {
  title: '@payloadcms/ui/elements/PreviewSizes',
  component: PreviewSizes,
  parameters: {
    docs: {
      description: {
        component: "PreviewSizes component from @payloadcms/ui/dist/elements/PreviewSizes"
      }
    }
  },
  argTypes: {
  "name": {
    "description": "name prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "active": {
    "description": "active prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "meta": {
    "description": "meta prop",
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
  "previewSrc": {
    "description": "previewSrc prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "doc": {
    "description": "doc prop",
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
  "uploadConfig": {
    "description": "uploadConfig prop",
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
 * Primary template for the PreviewSizes component
 */
const Template = (args) => <PreviewSizes {...args} />;

/**
 * Default state of the PreviewSizes component
 */
export const Default = Template.bind({});
Default.args = {};
