import React from 'react';
import { EditUpload } from '@payloadcms/ui/elements/EditUpload';

/**
 * EditUpload component from @payloadcms/ui/dist/elements/EditUpload
 */
export default {
  title: '@payloadcms/ui/elements/EditUpload',
  component: EditUpload,
  parameters: {
    docs: {
      description: {
        component: "EditUpload component from @payloadcms/ui/dist/elements/EditUpload"
      }
    }
  },
  argTypes: {
  "fileName": {
    "description": "fileName prop",
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
  "initialCrop": {
    "description": "initialCrop prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "initialFocalPoint": {
    "description": "initialFocalPoint prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "onSave": {
    "description": "onSave prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "showCrop": {
    "description": "showCrop prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "showFocalPoint": {
    "description": "showFocalPoint prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "dimension": {
    "description": "dimension prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "value": {
    "description": "value prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "coordinate": {
    "description": "coordinate prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "value: value_0": {
    "description": "value: value_0 prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "name": {
    "description": "name prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "onChange": {
    "description": "onChange prop",
    "table": {
      "type": {
        "summary": "any"
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
  }
},
  tags: ['autodocs'],
};

/**
 * Primary template for the EditUpload component
 */
const Template = (args) => <EditUpload {...args} />;

/**
 * Default state of the EditUpload component
 */
export const Default = Template.bind({});
Default.args = {};
