import React from 'react';
import { ListSelection } from '@payloadcms/ui/elements/ListSelection';

/**
 * ListSelection component from @payloadcms/ui/dist/elements/ListSelection
 */
export default {
  title: '@payloadcms/ui/elements/ListSelection',
  component: ListSelection,
  parameters: {
    docs: {
      description: {
        component: "ListSelection component from @payloadcms/ui/dist/elements/ListSelection"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the ListSelection component
 */
const Template = (args) => <ListSelection {...args} />;

/**
 * Default state of the ListSelection component
 */
export const Default = Template.bind({});
Default.args = {};
