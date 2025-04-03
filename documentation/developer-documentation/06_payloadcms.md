# payload

[Summary]

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Installation](#installation)
- [Configuration](#configuration)

## Introduction

The `payload` package is the core package for Payload CMS.
Version: 3.32.0
Description: Node React Headless CMS and Application Framework built on Next.js
Published: 2 days ago by elliotpayload <elliot@payloadcms.com>

## Key Features

- Provides the core functionality for Payload CMS, including content modeling, user authentication, and API generation.

## Installation

```bash
npm install payload
```

## Configuration

``````typescript
// Payload config
import payload from 'payload'

export default {
  ...payload.defaultConfig,
  // Your custom config here
}

The main function is `buildConfig`.

`buildConfig` is used to build and sanitize the Payload configuration.

It accepts the following parameters:

-   `config`: `Payload Config` - The Payload configuration object.

It returns a built and sanitized Payload Config.

The `config` object accepts the following properties:

-   `admin`: `object` - Configures the admin dashboard.
    -   `autoLogin`: `object | false`
    -   `avatar`: `'default' | 'gravatar' | { Component: PayloadComponent; }`
    -   `components`: `object`
    -   `custom`: `Record<string, any>`
    -   `dateFormat`: `string`
    -   `dependencies`: `AdminDependencies`
    -   `disable`: `boolean`
    -   `importMap`: `object`
    -   `livePreview`: `object`
    -   `meta`: `MetaConfig`
    -   `routes`: `object`
    -   `suppressHydrationWarning`: `boolean`
    -   `theme`: `'all' | 'dark' | 'light'`
    -   `timezones`: `TimezonesConfig`
    -   `user`: `string`

-   `auth`: `object` - Configures authentication-related Payload-wide settings.
    -   `jwtOrder`: `('Bearer' | 'cookie' | 'JWT')[]` - Defines which JWT identification methods you'd like to support for Payload's local auth strategy, as well as the order that they're retrieved in. Defaults to `['JWT', 'Bearer', 'cookie']`.

-   `bin`: `BinScriptConfig[]` - Custom Payload bin scripts can be injected via the config.
# payload

[Summary]

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Installation](#installation)
- [Configuration](#configuration)

## Introduction

The `payload` package is the core package for Payload CMS.
Version: 3.32.0
Description: Node React Headless CMS and Application Framework built on Next.js
Published: 2 days ago by elliotpayload <elliot@payloadcms.com>

## Key Features

- Provides the core functionality for Payload CMS, including content modeling, user authentication, and API generation.

## Installation

```bash
npm install payload
```

## Configuration

`````typescript
// Payload config
import payload from 'payload'

export default {
  ...payload.defaultConfig,
  // Your custom config here
}

The main function is `buildConfig`.

`buildConfig` is used to build and sanitize the Payload configuration.

It accepts the following parameters:

-   `config`: `Payload Config` - The Payload configuration object.

It returns a built and sanitized Payload Config.

The `config` object accepts the following properties:

-   `admin`: `object` - Configures the admin dashboard.
    -   `autoLogin`: `object | false`
    -   `avatar`: `'default' | 'gravatar' | { Component: PayloadComponent; }`
    -   `components`: `object`
    -   `custom`: `Record<string, any>`
    -   `dateFormat`: `string`
    -   `dependencies`: `AdminDependencies`
    -   `disable`: `boolean`
    -   `importMap`: `object`
    -   `livePreview`: `object`
    -   `meta`: `MetaConfig`
    -   `routes`: `object`
    -   `suppressHydrationWarning`: `boolean`
    -   `theme`: `'all' | 'dark' | 'light'`
    -   `timezones`: `TimezonesConfig`
    -   `user`: `string`

-   `auth`: `object` - Configures authentication-related Payload-wide settings.
    -   `jwtOrder`: `('Bearer' | 'cookie' | 'JWT')[]` - Defines which JWT identification methods you'd like to support for Payload's local auth strategy, as well as the order that they're retrieved in. Defaults to `['JWT', 'Bearer', 'cookie']`.

-   `bin`: `BinScriptConfig[]` - Custom Payload bin scripts can be injected via the config.
# payload

[Summary]

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Installation](#installation)
- [Configuration](#configuration)

## Introduction

The `payload` package is the core package for Payload CMS.
Version: 3.32.0
Description: Node React Headless CMS and Application Framework built on Next.js
Published: 2 days ago by elliotpayload <elliot@payloadcms.com>

## Key Features

- Provides the core functionality for Payload CMS, including content modeling, user authentication, and API generation.

## Installation

```bash
npm install payload
```

## Configuration

````typescript
// Payload config
import payload from 'payload'

export default {
  ...payload.defaultConfig,
  // Your custom config here
}

The main function is `buildConfig`.

`buildConfig` is used to build and sanitize the Payload configuration.

It accepts the following parameters:

-   `config`: `Payload Config` - The Payload configuration object.

It returns a built and sanitized Payload Config.

The `config` object accepts the following properties:

-   `admin`: `object` - Configures the admin dashboard.
    -   `autoLogin`: `object | false`
    -   `avatar`: `'default' | 'gravatar' | { Component: PayloadComponent; }`
    -   `components`: `object`
    -   `custom`: `Record<string, any>`
    -   `dateFormat`: `string`
    -   `dependencies`: `AdminDependencies`
    -   `disable`: `boolean`
    -   `importMap`: `object`
    -   `livePreview`: `object`
    -   `meta`: `MetaConfig`
    -   `routes`: `object`
    -   `suppressHydrationWarning`: `boolean`
    -   `theme`: `'all' | 'dark' | 'light'`
    -   `timezones`: `TimezonesConfig`
    -   `user`: `string`

-   `auth`: `object` - Configures authentication-related Payload-wide settings.
    -   `jwtOrder`: `('Bearer' | 'cookie' | 'JWT')[]` - Defines which JWT identification methods you'd like to support for Payload's local auth strategy, as well as the order that they're retrieved in. Defaults to `['JWT', 'Bearer', 'cookie']`.

-   `bin`: `BinScriptConfig[]` - Custom Payload bin scripts can be injected via the config.
# payload

[Summary]

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Installation](#installation)
- [Configuration](#configuration)

## Introduction

The `payload` package is the core package for Payload CMS.
Version: 3.32.0
Description: Node React Headless CMS and Application Framework built on Next.js
Published: 2 days ago by elliotpayload <elliot@payloadcms.com>

## Key Features

- Provides the core functionality for Payload CMS, including content modeling, user authentication, and API generation.

## Installation

```bash
npm install payload
``````

## Configuration

```typescript
// Payload config
import payload from 'payload'

export default {
  ...payload.defaultConfig,
  // Your custom config here
}

The main function is `buildConfig`.

`buildConfig` is used to build and sanitize the Payload configuration.

It accepts the following parameters:

-   `config`: `Payload Config` - The Payload configuration object.

It returns a built and sanitized Payload Config.

The `config` object accepts the following properties:

-   `admin`: `object` - Configures the admin dashboard.
    -   `autoLogin`: `object | false`
    -   `avatar`: `'default' | 'gravatar' | { Component: PayloadComponent; }`
    -   `components`: `object`
    -   `custom`: `Record<string, any>`
    -   `dateFormat`: `string`
    -   `dependencies`: `AdminDependencies`
    -   `disable`: `boolean`
    -   `importMap`: `object`
    -   `livePreview`: `object`
    -   `meta`: `MetaConfig`
    -   `routes`: `object`
    -   `suppressHydrationWarning`: `boolean`
    -   `theme`: `'all' | 'dark' | 'light'`
    -   `timezones`: `TimezonesConfig`
    -   `user`: `string`

-   `auth`: `object` - Configures authentication-related Payload-wide settings.
    -   `jwtOrder`: `('Bearer' | 'cookie' | 'JWT')[]` - Defines which JWT identification methods you'd like to support for Payload's local auth strategy, as well as the order that they're retrieved in. Defaults to `['JWT', 'Bearer', 'cookie']`.

-   `bin`: `BinScriptConfig[]` - Custom Payload bin scripts can be injected via the config.
```
