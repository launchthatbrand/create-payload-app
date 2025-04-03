import React from 'react';
import { RenderComponent } from '@payloadcms/ui/elements/RenderComponent';

/**
 * RenderComponent component from @payloadcms/ui/dist/elements/RenderComponent
 */
export default {
  title: '@payloadcms/ui/elements/RenderComponent',
  component: RenderComponent,
  parameters: {
    docs: {
      description: {
        component: "RenderComponent component from @payloadcms/ui/dist/elements/RenderComponent"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the RenderComponent component
 */
const Template = (args) => <RenderComponent {...args} />;

/**
 * Default state of the RenderComponent component
 */
export const Default = Template.bind({});
Default.args = {};
