# @payloadcms/ui - Usage

## Basic Usage

Import and use the UI components in your project.

```typescript
import { Button } from '@payloadcms/ui';

export default function MyComponent() {
  return <Button>Click me</Button>;
}
```

## Examples

### Button Component

The `Button` component is a basic button element.

```typescript
import { Button } from '@payloadcms/ui';

export default function MyComponent() {
  return <Button
    buttonStyle="primary"
    size="medium"
    onClick={() => alert('Clicked!')}
  >
    Click me
  </Button>;
}
```

### Card Component

The `Card` component is a container for displaying information.

```typescript
import { Card } from '@payloadcms/ui';

export default function MyComponent() {
  return (
    <Card title="My Card">
      This is the content of my card.
    </Card>
  );
}
```

### CodeEditor Component

The `CodeEditor` component is a code editor.

```typescript
import { CodeEditor } from '@payloadcms/ui';

export default function MyComponent() {
  return (
    <CodeEditor
      defaultLanguage="javascript"
      value="// Your code here"
    />
  );
}
```
