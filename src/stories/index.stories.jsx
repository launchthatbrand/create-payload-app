import React from 'react'

export default {
  title: '@payloadcms/ui/Introduction',
  parameters: {
    docs: {
      page: () => (
        <div className="sb-doc">
          <h1>Payload CMS UI Components</h1>

          <p>
            This Storybook showcases the UI components from the Payload CMS UI library. These
            components are designed to create consistent interfaces across Payload CMS applications.
          </p>

          <h2>Components Overview</h2>

          <p>
            Payload CMS UI provides a comprehensive set of UI components for building robust admin
            interfaces. The components are organized into several categories:
          </p>

          <h3>Basic Elements</h3>

          <ul>
            <li>
              <strong>Button</strong>: Multi-purpose button component with various styles and states
            </li>
            <li>
              <strong>Pill</strong>: Compact labels with optional icons
            </li>
            <li>
              <strong>Card</strong>: Container component for grouping related content
            </li>
            <li>
              <strong>Link</strong>: Navigation component that can behave as a button
            </li>
            <li>
              <strong>Banner</strong>: Notification banner for displaying messages
            </li>
            <li>
              <strong>Tooltip</strong>: Information tooltip that appears on hover
            </li>
          </ul>

          <h3>Form Elements</h3>

          <ul>
            <li>
              <strong>DatePickerField</strong>: Field for selecting dates
            </li>
            <li>
              <strong>CodeEditor</strong>: Code editor with syntax highlighting
            </li>
            <li>
              <strong>ReactSelect</strong>: Enhanced select input component
            </li>
          </ul>

          <h3>Layout Components</h3>

          <ul>
            <li>
              <strong>Drawer</strong>: Sliding panel for additional content
            </li>
            <li>
              <strong>Collapsible</strong>: Expandable/collapsible container
            </li>
            <li>
              <strong>Gutter</strong>: Component for managing layout spacing
            </li>
            <li>
              <strong>Popup</strong>: Floating content container
            </li>
          </ul>

          <h3>Utilities</h3>

          <ul>
            <li>
              <strong>AnimateHeight</strong>: Component for smooth height transitions
            </li>
            <li>
              <strong>CopyToClipboard</strong>: Functionality to copy content to clipboard
            </li>
            <li>
              <strong>ShimmerEffect</strong>: Loading state visual effect
            </li>
            <li>
              <strong>Status</strong>: Component for displaying status indicators
            </li>
          </ul>

          <h2>Installation</h2>

          <pre>
            <code>
              {`# npm
npm install @payloadcms/ui

# yarn
yarn add @payloadcms/ui

# pnpm
pnpm add @payloadcms/ui`}
            </code>
          </pre>

          <h2>Basic Usage</h2>

          <pre>
            <code>
              {`import { Button } from '@payloadcms/ui/elements/Button'
import { withSafeLinks } from '../../../.storybook/mockComponentWrappers';

export const MyComponent = () => {
  return <Button onClick={() => console.log('Button clicked')}>Click Me</Button>
}`}
            </code>
          </pre>

          <h2>Advanced Usage</h2>

          <pre>
            <code>
              {`import { Button } from '@payloadcms/ui/elements/Button'
import { Pill } from '@payloadcms/ui/elements/Pill'
import { Card } from '@payloadcms/ui/elements/Card'

export const MyComponent = () => {
  return (
    <Card>
      <h2>Card Title</h2>
      <p>Card content with important information</p>
      <div>
        <Pill pillStyle="success">Active</Pill>
        <Button buttonStyle="primary" size="small" onClick={() => console.log('Action triggered')}>
          Take Action
        </Button>
      </div>
    </Card>
  )
}`}
            </code>
          </pre>

          <h2>Documentation</h2>

          <p>
            For more information about using Payload CMS UI components, refer to the
            <a href="https://payloadcms.com/docs">Payload CMS documentation</a>.
          </p>
        </div>
      ),
    },
  },
}
