# @payloadcms/db-postgres

[Summary]

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Installation](#installation)
- [Configuration](#configuration)

## Introduction

The `@payloadcms/db-postgres` package provides a PostgreSQL database adapter for Payload.
Version: 3.32.0
Description: The officially supported Postgres database adapter for Payload
Published: 2 days ago by elliotpayload <elliot@payloadcms.com>

## Key Features

- Connects Payload CMS to a PostgreSQL database.
- Supports advanced database features like transactions and migrations.

## Installation

```bash
npm install @payloadcms/db-postgres
```

## Usage

The main functions are `postgresAdapter` and `connect`.

`postgresAdapter` is used to configure the PostgreSQL database adapter.

`connect` is used to connect to the PostgreSQL database.

```typescript
// Payload config
import { postgresAdapter } from '@payloadcms/db-postgres'

export default {
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
}
```
