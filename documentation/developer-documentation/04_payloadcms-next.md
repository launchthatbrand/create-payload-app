# @payloadcms/next

[Summary]

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Installation](#installation)
- [Usage](#usage)

## Introduction

The `@payloadcms/next` package provides integration with Next.js for Payload CMS.
Version: 3.32.0
Published: 2 days ago by elliotpayload <elliot@payloadcms.com>

## Key Features

- Seamless integration with Next.js projects.
- Provides components and utilities for fetching and displaying Payload CMS data in Next.js.

## Installation

```bash
npm install @payloadcms/next
```

## Usage

The main function is `withPayload`.

`withPayload` is a Next.js config wrapper that adds Payload CMS functionality to your Next.js application.

It accepts the following parameters:

- `nextConfig`: (optional) Your Next.js configuration object.
- `options`: (optional) An object containing the following options:
  - `devBundleServerPackages`: (optional) Whether to bundle server packages in development mode. Defaults to `true`.

It returns a modified Next.js configuration object.

```typescript
// Next.js page
import { usePayloadAPI } from '@payloadcms/next';

export default function Page() {
  const { data, loading, error } = usePayloadAPI('/api/posts');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```
