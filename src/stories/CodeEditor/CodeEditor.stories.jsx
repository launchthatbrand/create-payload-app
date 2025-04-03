import React from 'react';
import { CodeEditor } from '@payloadcms/ui/elements/CodeEditor';

/**
 * CodeEditor component from @payloadcms/ui/dist/elements/CodeEditor
 */
export default {
  title: '@payloadcms/ui/elements/CodeEditor',
  component: CodeEditor,
  parameters: {
    docs: {
      description: {
        component: "CodeEditor component from @payloadcms/ui/dist/elements/CodeEditor"
      }
    }
  },
  argTypes: {},
  tags: ['autodocs'],
};

/**
 * Primary template for the CodeEditor component
 */
const Template = (args) => <CodeEditor {...args} />;

/**
 * Default state of the CodeEditor component
 */
export const Default = Template.bind({});
Default.args = {};
