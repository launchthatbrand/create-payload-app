import React from 'react';
import { DocumentLocked } from '@payloadcms/ui/elements/DocumentLocked';

/**
 * DocumentLocked component from @payloadcms/ui/dist/elements/DocumentLocked
 */
export default {
  title: '@payloadcms/ui/elements/DocumentLocked',
  component: DocumentLocked,
  parameters: {
    docs: {
      description: {
        component: "DocumentLocked component from @payloadcms/ui/dist/elements/DocumentLocked"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the DocumentLocked component
 */
const Template = (args) => <DocumentLocked {...args} />;

/**
 * Default state of the DocumentLocked component
 */
export const Default = Template.bind({});
Default.args = {};
