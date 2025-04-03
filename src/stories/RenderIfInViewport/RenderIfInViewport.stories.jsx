import React from 'react';
import { RenderIfInViewport } from '@payloadcms/ui/elements/RenderIfInViewport';

/**
 * RenderIfInViewport component from @payloadcms/ui/dist/elements/RenderIfInViewport
 */
export default {
  title: '@payloadcms/ui/elements/RenderIfInViewport',
  component: RenderIfInViewport,
  parameters: {
    docs: {
      description: {
        component: "RenderIfInViewport component from @payloadcms/ui/dist/elements/RenderIfInViewport"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the RenderIfInViewport component
 */
const Template = (args) => <RenderIfInViewport {...args} />;

/**
 * Default state of the RenderIfInViewport component
 */
export const Default = Template.bind({});
Default.args = {};
