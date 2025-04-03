import React from 'react';
import { BulkUpload } from '@payloadcms/ui/elements/BulkUpload';

/**
 * BulkUpload component from @payloadcms/ui/dist/elements/BulkUpload
 */
export default {
  title: '@payloadcms/ui/elements/BulkUpload',
  component: BulkUpload,
  parameters: {
    docs: {
      description: {
        component: "BulkUpload component from @payloadcms/ui/dist/elements/BulkUpload"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the BulkUpload component
 */
const Template = (args) => <BulkUpload {...args} />;

/**
 * Default state of the BulkUpload component
 */
export const Default = Template.bind({});
Default.args = {};
