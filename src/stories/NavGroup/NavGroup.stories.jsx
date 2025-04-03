import React from 'react';
import { NavGroup } from '@payloadcms/ui/elements/NavGroup';

/**
 * NavGroup component from @payloadcms/ui/dist/elements/NavGroup
 */
export default {
  title: '@payloadcms/ui/elements/NavGroup',
  component: NavGroup,
  parameters: {
    docs: {
      description: {
        component: "NavGroup component from @payloadcms/ui/dist/elements/NavGroup"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the NavGroup component
 */
const Template = (args) => <NavGroup {...args} />;

/**
 * Default state of the NavGroup component
 */
export const Default = Template.bind({});
Default.args = {};
