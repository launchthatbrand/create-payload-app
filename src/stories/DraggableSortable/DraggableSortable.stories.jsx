import React from 'react';
import { DraggableSortable } from '@payloadcms/ui/elements/DraggableSortable';

/**
 * DraggableSortable component from @payloadcms/ui/dist/elements/DraggableSortable
 */
export default {
  title: '@payloadcms/ui/elements/DraggableSortable',
  component: DraggableSortable,
  parameters: {
    docs: {
      description: {
        component: "DraggableSortable component from @payloadcms/ui/dist/elements/DraggableSortable"
      }
    }
  },
  argTypes: {
  "children": {
    "description": "children prop",
    "control": "text"
  },
  "ids": {
    "description": "ids prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "onDragEnd": {
    "description": "onDragEnd prop",
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
 * Primary template for the DraggableSortable component
 */
const Template = (args) => <DraggableSortable {...args} />;

/**
 * Default state of the DraggableSortable component
 */
export const Default = Template.bind({});
Default.args = {
  "children": "Example Content"
};
