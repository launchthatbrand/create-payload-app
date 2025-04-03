# @payloadcms/ui

[Summary]

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Installation](#installation)
- [Usage](#usage)

## Introduction

The `@payloadcms/ui` package provides a set of UI components for Payload CMS.
Version: 3.32.0
Published: 2 days ago by elliotpayload <elliot@payloadcms.com>

## Key Features

- Reusable UI components for building custom admin panels and front-end applications.
- Based on a modern design system.

## Installation

```bash
npm install @payloadcms/ui
```

## Usage

The `@payloadcms/ui` package provides a set of UI components for Payload CMS.

The main component is `Button`.

The `Button` component accepts the following props:

- `id`: `string`
- `type`: `'button' | 'submit'` (defaults to `'button'`)
- `aria-label`: `string`
- `buttonStyle`: `'primary' | 'secondary' | ...` (defaults to `'primary'`)
- `children`: `React.ReactNode`
- `className`: `string`
- `disabled`: `boolean`
- `el`: `'button' | 'anchor' | 'link'` (defaults to `'button'`)
- `enableSubMenu`: `boolean`
- `icon`: `React.ReactNode | string`
- `iconPosition`: `'right' | 'left'` (defaults to `'right'`)
- `iconStyle`: `'without-border' | ...` (defaults to `'without-border'`)
- `newTab`: `boolean`
- `onClick`: `(event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void`
- `onMouseDown`: `(event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void`
- `ref`: `React.Ref<HTMLButtonElement | HTMLAnchorElement>`
- `round`: `boolean`
- `size`: `'small' | 'medium' | 'large'` (defaults to `'medium'`)
- `SubMenuPopupContent`: `React.ComponentType<any>`
- `to`: `string`
- `tooltip`: `string`
- `url`: `string`

`````typescript
// Import and use the UI components in your project.
import { Button } from '@payloadcms/ui';

export default function MyComponent() {
  return <Button>Click me</Button>;
}

The `Card` component accepts the following props:

-   `id`: `string`
-   `actions`: `React.ReactNode`
-   `buttonAriaLabel`: `string`
-   `href`: `string`
-   `onClick`: `(event: React.MouseEvent<HTMLDivElement>) => void`
-   `title`: `React.ReactNode`
-   `titleAs`: `'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'`

The `CodeEditor` component accepts the following props:

*   `className`: `string`
*   `maxHeight`: `number`
*   `minHeight`: `number`
*   `options`: `object` (Monaco editor options)
*   `readOnly`: `boolean`
*   `defaultLanguage`: `string`
*   `onChange`: `(value: string, event: any) => void`
*   `onMount`: `(editor: any, monaco: any) => void`
# @payloadcms/ui

The `CodeEditor` component accepts the following props:

*   `className`: `string`
*   `maxHeight`: `number`
*   `minHeight`: `number`
*   `options`: `object` (Monaco editor options)
*   `readOnly`: `boolean`
*   `defaultLanguage`: `string`
*   `onChange`: `(value: string, event: any) => void`
*   `onMount`: `(editor: any, monaco: any) => void`

[Summary]

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Installation](#installation)
- [Usage](#usage)

## Introduction

The `@payloadcms/ui` package provides a set of UI components for Payload CMS.
Version: 3.32.0
Published: 2 days ago by elliotpayload <elliot@payloadcms.com>

## Key Features

- Reusable UI components for building custom admin panels and front-end applications.
- Based on a modern design system.

## Installation

```bash
npm install @payloadcms/ui
```

## Usage

The `@payloadcms/ui` package provides a set of UI components for Payload CMS.

The main component is `Button`.

The `Button` component accepts the following props:

- `id`: `string`
- `type`: `'button' | 'submit'` (defaults to `'button'`)
- `aria-label`: `string`
- `buttonStyle`: `'primary' | 'secondary' | ...` (defaults to `'primary'`)
- `children`: `React.ReactNode`
- `className`: `string`
- `disabled`: `boolean`
- `el`: `'button' | 'anchor' | 'link'` (defaults to `'button'`)
- `enableSubMenu`: `boolean`
- `icon`: `React.ReactNode | string`
- `iconPosition`: `'right' | 'left'` (defaults to `'right'`)
- `iconStyle`: `'without-border' | ...` (defaults to `'without-border'`)
- `newTab`: `boolean`
- `onClick`: `(event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void`
- `onMouseDown`: `(event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void`
- `ref`: `React.Ref<HTMLButtonElement | HTMLAnchorElement>`
- `round`: `boolean`
- `size`: `'small' | 'medium' | 'large'` (defaults to `'medium'`)
- `SubMenuPopupContent`: `React.ComponentType<any>`
- `to`: `string`
- `tooltip`: `string`
- `url`: `string`

````typescript
// Import and use the UI components in your project.
import { Button } from '@payloadcms/ui';

export default function MyComponent() {
  return <Button>Click me</Button>;
}

The `Card` component accepts the following props:

-   `id`: `string`
-   `actions`: `React.ReactNode`
-   `buttonAriaLabel`: `string`
-   `href`: `string`
-   `onClick`: `(event: React.MouseEvent<HTMLDivElement>) => void`
-   `title`: `React.ReactNode`
-   `titleAs`: `'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'`

The `CodeEditor` component accepts the following props:

*   `className`: `string`
*   `maxHeight`: `number`
*   `minHeight`: `number`
*   `options`: `object` (Monaco editor options)
*   `readOnly`: `boolean`
*   `defaultLanguage`: `string`
*   `onChange`: `(value: string, event: any) => void`
*   `onMount`: `(editor: any, monaco: any) => void`

# @payloadcms/ui

[Summary]

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Installation](#installation)
- [Usage](#usage)

## Introduction

The `@payloadcms/ui` package provides a set of UI components for Payload CMS.
Version: 3.32.0
Published: 2 days ago by elliotpayload <elliot@payloadcms.com>

## Key Features

- Reusable UI components for building custom admin panels and front-end applications.
- Based on a modern design system.

## Installation

```bash
npm install @payloadcms/ui
`````

## Usage

The `@payloadcms/ui` package provides a set of UI components for Payload CMS.

The main component is `Button`.

The `Button` component accepts the following props:

- `id`: `string`
- `type`: `'button' | 'submit'` (defaults to `'button'`)
- `aria-label`: `string`
- `buttonStyle`: `'primary' | 'secondary' | ...` (defaults to `'primary'`)
- `children`: `React.ReactNode`
- `className`: `string`
- `disabled`: `boolean`
- `el`: `'button' | 'anchor' | 'link'` (defaults to `'button'`)
- `enableSubMenu`: `boolean`
- `icon`: `React.ReactNode | string`
- `iconPosition`: `'right' | 'left'` (defaults to `'right'`)
- `iconStyle`: `'without-border' | ...` (defaults to `'without-border'`)
- `newTab`: `boolean`
- `onClick`: `(event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void`
- `onMouseDown`: `(event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void`
- `ref`: `React.Ref<HTMLButtonElement | HTMLAnchorElement>`
- `round`: `boolean`
- `size`: `'small' | 'medium' | 'large'` (defaults to `'medium'`)
- `SubMenuPopupContent`: `React.ComponentType<any>`
- `to`: `string`
- `tooltip`: `string`
- `url`: `string`

```typescript
// Import and use the UI components in your project.
import { Button } from '@payloadcms/ui';

export default function MyComponent() {
  return <Button>Click me</Button>;
}
```
