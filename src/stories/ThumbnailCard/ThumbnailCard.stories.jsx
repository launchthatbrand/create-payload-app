import React from 'react';
import { ThumbnailCard } from '@payloadcms/ui/elements/ThumbnailCard';
import { withSafeLinks } from '../../../.storybook/mockComponentWrappers';


// Use wrapper to ensure links have href props
const SafeThumbnailCard = withSafeLinks(ThumbnailCard);

/**
 * ThumbnailCard component from @payloadcms/ui/dist/elements/ThumbnailCard
 */
export default {
  title: '@payloadcms/ui/elements/ThumbnailCard',
  component: ThumbnailCard,
  parameters: {
    docs: {
      description: {
        component: "ThumbnailCard component from @payloadcms/ui/dist/elements/ThumbnailCard"
      }
    }
  },
  argTypes: {
  "alignLabel": {
    "description": "alignLabel prop",
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
  "doc": {
    "description": "doc prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "label: labelFromProps": {
    "description": "label: labelFromProps prop",
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
  "thumbnail": {
    "description": "thumbnail prop",
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
 * Primary template for the ThumbnailCard component
 */
const Template = (args) => <SafeThumbnailCard {...args} />;

/**
 * Default state of the ThumbnailCard component
 */
export const Default = Template.bind({});
Default.args = {
  "href": "#",
  "title": "ThumbnailCard Example"};
