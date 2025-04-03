import React from 'react';
import { CopyLocaleData } from '@payloadcms/ui/elements/CopyLocaleData';

/**
 * CopyLocaleData component from @payloadcms/ui/dist/elements/CopyLocaleData
 */
export default {
  title: '@payloadcms/ui/elements/CopyLocaleData',
  component: CopyLocaleData,
  parameters: {
    docs: {
      description: {
        component: "CopyLocaleData component from @payloadcms/ui/dist/elements/CopyLocaleData"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the CopyLocaleData component
 */
const Template = (args) => <CopyLocaleData {...args} />;

/**
 * Default state of the CopyLocaleData component
 */
export const Default = Template.bind({});
Default.args = {};
