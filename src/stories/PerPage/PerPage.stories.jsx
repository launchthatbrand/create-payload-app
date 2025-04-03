import React from 'react';
import { PerPage } from '@payloadcms/ui/elements/PerPage';

/**
 * PerPage component from @payloadcms/ui/dist/elements/PerPage
 */
export default {
  title: '@payloadcms/ui/elements/PerPage',
  component: PerPage,
  parameters: {
    docs: {
      description: {
        component: "PerPage component from @payloadcms/ui/dist/elements/PerPage"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the PerPage component
 */
const Template = (args) => <PerPage {...args} />;

/**
 * Default state of the PerPage component
 */
export const Default = Template.bind({});
Default.args = {};
