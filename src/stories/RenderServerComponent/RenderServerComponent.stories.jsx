import React from 'react';
import { RenderServerComponent } from '@payloadcms/ui/elements/RenderServerComponent';

/**
 * RenderServerComponent component from @payloadcms/ui/dist/elements/RenderServerComponent
 */
export default {
  title: '@payloadcms/ui/elements/RenderServerComponent',
  component: RenderServerComponent,
  parameters: {
    docs: {
      description: {
        component: "RenderServerComponent component from @payloadcms/ui/dist/elements/RenderServerComponent"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the RenderServerComponent component
 */
const Template = (args) => <RenderServerComponent {...args} />;

/**
 * Default state of the RenderServerComponent component
 */
export const Default = Template.bind({});
Default.args = {};
