import React from 'react';
import { WithServerSideProps } from '@payloadcms/ui/elements/WithServerSideProps';

/**
 * WithServerSideProps component from @payloadcms/ui/dist/elements/WithServerSideProps
 */
export default {
  title: '@payloadcms/ui/elements/WithServerSideProps',
  component: WithServerSideProps,
  parameters: {
    docs: {
      description: {
        component: "WithServerSideProps component from @payloadcms/ui/dist/elements/WithServerSideProps"
      }
    }
  },
  argTypes: {
  "Component": {
    "description": "Component prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "serverOnlyProps": {
    "description": "serverOnlyProps prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  },
  "...rest": {
    "description": "...rest prop",
    "table": {
      "type": {
        "summary": "any"
      }
    }
  }
},
  tags: ['autodocs'],
};

/**
 * Primary template for the WithServerSideProps component
 */
const Template = (args) => <WithServerSideProps {...args} />;

/**
 * Default state of the WithServerSideProps component
 */
export const Default = Template.bind({});
Default.args = {};
