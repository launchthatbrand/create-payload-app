# @payloadcms/ui Documentation

## Table of Contents

- [Utility Functions](#utility-functions)
  - [flattenRows](#flattenrows)
  - [separateRows](#separaterows)
- [Type Definitions](#type-definitions)
  - [Result](#result)
  - [flattenRows()](#flattenrows)
  - [separateRows()](#separaterows)

## Utility Functions

### flattenRows

Utility function from /dist/forms/Form/rows.js

File: `/dist/forms/Form/rows.js`

```typescript
flattenRows(path: any, rows: any): any
```

#### Parameters

- `path`: any
- `rows`: any

---

### separateRows

Utility function from /dist/forms/Form/rows.js

File: `/dist/forms/Form/rows.js`

```typescript
separateRows(path: any, fields: any): any
```

#### Parameters

- `path`: any
- `fields`: any

---

## Type Definitions

### flattenRows()

Function declared in /dist/forms/Form/rows.d.ts

File: `/dist/forms/Form/rows.d.ts`

```typescript
function flattenRows(): (path: string, rows: FormState[]) => FormState
```

---

### Result

Type definition from /dist/forms/Form/rows.d.ts

File: `/dist/forms/Form/rows.d.ts`

```typescript
type Result = {
    remainingFields: FormState
```

---

### separateRows()

Function declared in /dist/forms/Form/rows.d.ts

File: `/dist/forms/Form/rows.d.ts`

```typescript
function separateRows(): (path: string, fields: FormState) => Result
```

---

