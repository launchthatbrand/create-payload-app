import React from 'react';
import { AddNewRelation } from '@payloadcms/ui/elements/AddNewRelation';

/**
 * AddNewRelation component from @payloadcms/ui/dist/elements/AddNewRelation
 */
export default {
  title: '@payloadcms/ui/elements/AddNewRelation',
  component: AddNewRelation,
  parameters: {
    docs: {
      description: {
        component: "AddNewRelation component from @payloadcms/ui/dist/elements/AddNewRelation"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the AddNewRelation component
 */
const Template = (args) => <AddNewRelation {...args} />;

/**
 * Default state of the AddNewRelation component
 */
export const Default = Template.bind({});
Default.args = {};
