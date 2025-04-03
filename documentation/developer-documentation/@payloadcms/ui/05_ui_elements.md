# @payloadcms/ui - UI Elements

## Elements

### AddNewRelation

### AnimateHeight

### AppHeader

### ArrayAction

### Autosave

### Banner

### BulkUpload

### Button

The `Button` component is a versatile button element that can be used for various actions and navigation.

#### Props

- `id`: `string` - A unique identifier for the button.
- `type`: `'button' | 'submit'` (defaults to `'button'`) - The type of the button. Use `'submit'` for buttons within a form.
- `aria-label`: `string` - An accessibility label for the button.
- `buttonStyle`: `'primary' | 'secondary' | ...` (defaults to `'primary'`) - The visual style of the button. Available options include `'primary'`, `'secondary'`, and potentially other custom styles.
- `children`: `React.ReactNode` - The content to be displayed within the button. This can be text, icons, or other React elements.
- `className`: `string` - Additional CSS classes to apply to the button.
- `disabled`: `boolean` - Whether the button is disabled.
- `el`: `'button' | 'anchor' | 'link'` (defaults to `'button'`) - The HTML element to use for the button. Use `'anchor'` for standard `<a>` links and `'link'` for Next.js `<Link>` components.
- `enableSubMenu`: `boolean` - Whether to enable a submenu for the button.
- `icon`: `React.ReactNode | string` - An icon to display within the button. This can be a React element or a string referencing a built-in icon.
- `iconPosition`: `'right' | 'left'` (defaults to `'right'`) - The position of the icon relative to the button's text.
- `iconStyle`: `'without-border' | ...` (defaults to `'without-border'`) - The style of the icon.
- `newTab`: `boolean` - Whether to open the link in a new tab (only applicable when `el` is `'anchor'` or `'link'`).
- `onClick`: `(event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void` - A function to be called when the button is clicked.
- `onMouseDown`: `(event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void` - A function to be called when the mouse button is pressed down on the button.
- `ref`: `React.Ref<HTMLButtonElement | HTMLAnchorElement>` - A ref to the button element.
- `round`: `boolean` - Whether to render the button with rounded corners.
- `size`: `'small' | 'medium' | 'large'` (defaults to `'medium'`) - The size of the button.
- `SubMenuPopupContent`: `React.ComponentType<any>` - A React component to render as a submenu popup.
- `to`: `string` - The URL to navigate to when the button is clicked (only applicable when `el` is `'link'`).
- `tooltip`: `string` - A tooltip to display when the button is hovered.
- `url`: `string` - The URL to navigate to when the button is clicked (only applicable when `el` is `'anchor'` or `'link'`).

#### Usage

The `Button` component can be used for various actions, such as submitting forms, navigating to different pages, or triggering specific events.

```typescript
import { Button } from '@payloadcms/ui';

export default function MyComponent() {
  return (
    <Button
      buttonStyle="primary"
      size="large"
      onClick={() => alert('Clicked!')}
    >
      Click me
    </Button>
  );
}
```

#### When to Use

- For primary actions on a page.
- For navigation within the application.
- For triggering specific events or functions.

### Card

The `Card` component is a container for displaying information in a visually appealing way.

#### Props

- `id`: `string` - A unique identifier for the card.
- `actions`: `React.ReactNode` - Actions to display in the card's header, typically as buttons.
- `buttonAriaLabel`: `string` - An accessibility label for the clickable area of the card.
- `href`: `string` - A URL to navigate to when the card is clicked.
- `onClick`: `(event: React.MouseEvent<HTMLDivElement>) => void` - A function to be called when the card is clicked.
- `title`: `React.ReactNode` - The title of the card.
- `titleAs`: `'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'` - The HTML element to use for the card's title.

#### Usage

The `Card` component can be used to display various types of content, such as articles, products, or user profiles.

```typescript
import { Card } from '@payloadcms/ui';

export default function MyComponent() {
  return (
    <Card
      title="My Card"
      href="/my-card"
      buttonAriaLabel="View My Card"
    >
      This is the content of my card.
    </Card>
  );
}
```

#### When to Use

- For displaying content in a visually appealing and organized way.
- For grouping related information together.
- For creating a consistent look and feel across your application.

### CodeEditor

The `CodeEditor` component is a code editor based on Monaco Editor.

#### Props

- `className`: `string` - Additional CSS classes to apply to the code editor.
- `maxHeight`: `number` - The maximum height of the code editor.
- `minHeight`: `number` - The minimum height of the code editor.
- `options`: `object` (Monaco editor options) - Options to pass to the Monaco editor. See the Monaco Editor documentation for available options.
- `readOnly`: `boolean` - Whether the code editor is read-only.
- `defaultLanguage`: `string` - The default language for the code editor.
- `onChange`: `(value: string, event: any) => void` - A function to be called when the code editor's value changes.
- `onMount`: `(editor: any, monaco: any) => void` - A function to be called when the code editor is mounted.
- `value`: `string` - The initial value of the code editor.

#### Usage

The `CodeEditor` component can be used to display and edit code snippets.

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

#### When to Use

- For displaying code snippets in a visually appealing way.
- For allowing users to edit code snippets.
- For creating a code editor within your application.

### Collapsible

The `Collapsible` component is used to hide and show content.

#### Props

- `actions`: `React.ReactNode` - Actions to display in the collapsible's header, typically as buttons.
- `children`: `React.ReactNode` - The content to be displayed within the collapsible.
- `className`: `string` - Additional CSS classes to apply to the collapsible.
- `collapsibleStyle`: `"default" | "secondary"` (defaults to `"default"`) - The style of the collapsible.
- `dragHandleProps`: `object` - Props for the drag handle (used for sortable lists).
- `header`: `React.ReactNode` - The content to display in the collapsible's header.
- `initCollapsed`: `boolean` - Whether the collapsible is initially collapsed.
- `isCollapsed`: `boolean` - Whether the collapsible is collapsed.
- `onToggle`: `(isCollapsed: boolean) => void` - A function to be called when the collapsible is toggled.

#### Usage

The `Collapsible` component can be used to hide and show content, such as form fields or sections of a document.

```typescript
import { Collapsible } from '@payloadcms/ui';

export default function MyComponent() {
  return (
    <Collapsible header="My Collapsible">
      This is the content of my collapsible.
    </Collapsible>
  );
}
```

#### When to Use

- For hiding and showing content to reduce clutter.
- For organizing content into sections.
- For creating a more user-friendly interface.

### ColumnSelector

The `ColumnSelector` component is used to select which columns to display in a table.

#### Props

- `collectionSlug`: `string` - The slug of the collection to display columns for.

#### Usage

The `ColumnSelector` component can be used to allow users to customize the columns displayed in a table.

```typescript
import { ColumnSelector } from '@payloadcms/ui';

export default function MyComponent() {
  return (
    <ColumnSelector collectionSlug="my-collection" />
  );
}
```

#### When to Use

- For allowing users to customize the columns displayed in a table.
- For providing a more flexible and user-friendly interface.

### ConfirmationModal

The `ConfirmationModal` component is used to display a modal for confirming an action.

#### Props

- `body`: `React.ReactNode` - The body content of the modal.
- `cancelLabel`: `string` - The label for the cancel button.
- `className`: `string` - Additional CSS classes to apply to the modal.
- `confirmingLabel`: `string` - The label for the confirm button when confirming.
- `confirmLabel`: `string` - The label for the confirm button.
- `heading`: `React.ReactNode` - The heading of the modal.
- `modalSlug`: `string` - A unique identifier for the modal.
- `onCancel`: `() => void` - A function to be called when the cancel button is clicked.
- `onConfirm`: `() => Promise<void>` - A function to be called when the confirm button is clicked.

#### Usage

The `ConfirmationModal` component can be used to confirm actions such as deleting a document or publishing a page.

```typescript
import { ConfirmationModal } from '@payloadcms/ui';

export default function MyComponent() {
  return (
    <ConfirmationModal
      modalSlug="delete-document"
      heading="Delete Document"
      body="Are you sure you want to delete this document?"
      confirmLabel="Delete"
      onConfirm={() => {
        // Delete the document
      }}
      onCancel={() => {
        // Cancel the deletion
      }}
    />
  );
}
```

#### When to Use

- For confirming destructive actions, such as deleting a document.
- For confirming actions that cannot be undone.
- For providing a clear and concise way for users to confirm their intentions.

### CopyLocaleData

The `CopyLocaleData` component is used to copy data from one locale to another.

#### Props

This component does not directly accept any props. It uses hooks to access configuration and document information.

#### Usage

The `CopyLocaleData` component is used to copy data from one locale to another. It is typically used in the admin panel to allow users to easily translate content.

To use this component, you must first open the "Copy to Locale" drawer. This can be done by clicking the "Copy to Locale" button in the document actions menu.

Once the drawer is open, you can select the locale to copy data from and the locale to copy data to. You can also choose whether to overwrite existing data in the target locale.

After you have selected the desired options, click the "Copy" button to copy the data.

#### When to Use

- For copying data from one locale to another.
- For translating content.
- For quickly populating content in multiple locales.

### CopyToClipboard

### DatePicker

### DeleteDocument

### DeleteMany

### DocumentControls

### DocumentDrawer

### DocumentFields

### DocumentLocked

### DocumentTakeOver

### DraggableSortable

### Drawer

### Dropzone

### DuplicateDocument

### EditMany

### EditUpload

### EmailAndUsername

### ErrorPill

### FieldSelect

### FileDetails

### FullscreenModal

### GenerateConfirmation

### Gutter

### Hamburger

### HydrateAuthProvider

### IDLabel

### LeaveWithoutSaving

### Link

### ListControls

### ListDrawer

### ListSelection

### Loading

### LoadingOverlay

### Localizer

### Locked

### Logout

### Modal

### Nav

### NavGroup

### Pagination

### PerPage

### Pill

### Popup

### PreviewButton

### PreviewSizes

### PublishButton

### PublishMany

### QueryPresets

### ReactSelect

### RelationshipTable

### RenderComponent

### RenderCustomComponent

### RenderIfInViewport

### RenderServerComponent

### RenderTitle

### SaveButton

### SaveDraftButton

### SearchFilter

### SelectAll

### SelectMany

### SelectRow

### ShimmerEffect

### SortColumn

### SortComplex

### Status

### StayLoggedIn

### StepNav

### Table

### Thumbnail

### ThumbnailCard

### TimezonePicker

### Toasts

### Tooltip

### Translation

### UnpublishMany

### Upload

### ViewDescription

### WhereBuilder

### WindowInfo

### withMergedProps

### WithServerSideProps

## Fields

### Array

### Blocks

### Checkbox

### Code

### Collapsible

### ConfirmPassword

### DateTime

### Email

### FieldDescription

### FieldError

### FieldLabel

### Group

### Hidden

### Join

### JSON

### Number

### Password

### Point

### RadioGroup

### Relationship

### RichText

### Row

### Select

### Text

### Textarea

### UI

### Upload
