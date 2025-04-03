# @payloadcms/admin-bar

[Summary]

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Installation](#installation)
- [Usage](#usage)

## Introduction

The `@payloadcms/admin-bar` package provides an admin bar component for React apps using Payload.
Version: 3.32.0
Description: An admin bar for React apps using Payload
Published: 2 days ago by elliotpayload <elliot@payloadcms.com>

## Key Features

- Displays helpful links and information in the admin panel.
- Customizable with additional links and information.

## Installation

```bash
npm install @payloadcms/admin-bar
```

## Usage

The main component is `PayloadAdminBar`.

```typescript
// Payload config
import { adminBar } from '@payloadcms/admin-bar'

export default {
  plugins: [adminBar()],
}
```
