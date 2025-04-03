# Dynamic Collection Injection in Payload CMS

This document explores concepts and techniques for dynamically injecting new collections into a running Payload CMS instance, allowing you to add new data models, API endpoints, and database tables without restarting your application.

## Table of Contents

- [Overview](#overview)
- [Challenges of Dynamic Collections](#challenges-of-dynamic-collections)
- [Potential Approaches](#potential-approaches)
- [Implementation Strategy](#implementation-strategy)
- [Security Considerations](#security-considerations)
- [Operational Considerations](#operational-considerations)
- [Example Implementation](#example-implementation)

## Overview

By default, Payload CMS initializes collections defined in your `payload.config.ts` file during startup. However, for certain use cases, you might want to dynamically add new collections while your application is running:

- Multi-tenant applications where each tenant needs custom collections
- SaaS platforms where users can define their own data models
- Plugin systems that need to register new data types
- Development environments where rapid iteration is required

## Challenges of Dynamic Collections

Adding collections during runtime presents several challenges:

1. **Database Schema Modifications**: Creating new tables or collections in the database
2. **API Route Registration**: Dynamically registering new REST and GraphQL endpoints
3. **Admin Panel UI Updates**: Reflecting new collections in the admin interface
4. **Typescript Type Safety**: Maintaining type safety with dynamically created collections
5. **Authentication and Access Control**: Applying proper security to new collections

## Potential Approaches

### 1. Meta-Collections Approach

Instead of creating true dynamic collections, you can implement a meta-collection system:

```typescript
// A single "meta" collection that stores all dynamic data
const DynamicContent: CollectionConfig = {
  slug: 'dynamic-content',
  fields: [
    {
      name: 'collectionKey',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'data',
      type: 'json',
      required: true,
    },
    // Additional fields for schema definition, validation rules, etc.
  ],
}
```

This approach stores dynamic data within a flexible structure, using application logic to enforce schemas.

### 2. Plugin-Based System

You can implement a plugin system that allows registering new collections:

```typescript
// Store plugin/collection definitions in the database
const CollectionRegistry: CollectionConfig = {
  slug: 'collection-registry',
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: 'fields',
      type: 'json',
      required: true,
    },
    // Other collection configuration
  ],
}
```

On application restart, these registered collections would be loaded from the database and included in the configuration.

### 3. Runtime Injection Approach

For true runtime collection addition, a more complex approach is needed:

```typescript
// A service that manages dynamic collections
class CollectionManager {
  constructor(private payload: Payload) {}

  async addCollection(collectionConfig: CollectionConfig) {
    // 1. Create database schema
    await this.createDatabaseSchema(collectionConfig)

    // 2. Register API endpoints
    this.registerAPIEndpoints(collectionConfig)

    // 3. Update admin UI
    this.updateAdminUI(collectionConfig)

    // 4. Refresh GraphQL schema
    await this.refreshGraphQLSchema()
  }

  // Implementation details...
}
```

## Implementation Strategy

To implement true runtime collection injection, we need to tap into Payload's internals:

### 1. Dynamic Database Schema Creation

For SQL databases (PostgreSQL, MySQL):

```typescript
async function createDynamicTable(payload, collectionConfig) {
  const { slug, fields } = collectionConfig

  // Get database connection
  const db = payload.db.drizzle || payload.db.knex || payload.db.connection

  // Generate SQL for table creation
  const createTableSQL = generateTableSQL(slug, fields)

  // Execute SQL
  await db.raw(createTableSQL)

  // Create indexes
  await createIndexes(db, slug, fields)
}
```

For MongoDB:

```typescript
async function createDynamicCollection(payload, collectionConfig) {
  const { slug } = collectionConfig

  // Get MongoDB connection
  const db = payload.db.connection

  // Create collection
  await db.createCollection(slug)

  // Create indexes
  const indexes = generateIndexes(collectionConfig.fields)
  await db.collection(slug).createIndexes(indexes)
}
```

### 2. API Endpoint Registration

To register new REST endpoints:

```typescript
function registerRESTEndpoints(payload, collectionConfig) {
  const { slug } = collectionConfig
  const app = payload.express.app

  // Register CRUD endpoints
  app.get(`/api/${slug}`, payload.authenticate, (req, res, next) => {
    // Custom middleware to handle collection that doesn't exist in core config
    req.collection = collectionConfig
    payload.endpoints.find(req, res, next)
  })

  // Similarly for other HTTP methods (POST, PATCH, DELETE)
  // ...
}
```

### 3. Admin UI Updates

Updating the admin UI is challenging since it's a React application:

```typescript
function updateAdminUI(payload, collectionConfig) {
  // This would require a websocket connection to the admin panel
  // to notify it of the new collection

  payload.socketServer.broadcast('collection-added', {
    collection: collectionConfig,
  })

  // The admin panel would need to listen for this event and update accordingly
}
```

### 4. GraphQL Schema Regeneration

To refresh the GraphQL schema:

```typescript
async function refreshGraphQLSchema(payload, newCollections) {
  // Access internal GraphQL schema builder
  const schema = buildGraphQLSchema({
    // Combine existing and new collections
    collections: [...payload.collections, ...newCollections],
    globals: payload.globals,
  })

  // Update the GraphQL middleware
  payload.express.app._router.stack = payload.express.app._router.stack.filter(
    (layer) => !layer.route || layer.route.path !== '/api/graphql',
  )

  // Re-register the GraphQL endpoint with new schema
  payload.express.app.use(
    '/api/graphql',
    graphqlHTTP({
      schema,
      graphiql: payload.config.graphQL.graphiql,
      context: ({ req }) => ({ req, user: req.user }),
    }),
  )
}
```

## Security Considerations

Dynamic collection injection has significant security implications:

1. **Access Control**: Ensure proper access control on the collection creation API
2. **Schema Validation**: Validate collection configurations to prevent injection attacks
3. **Resource Limits**: Implement limits on the number and complexity of dynamic collections
4. **Data Isolation**: Ensure data isolation between tenants if implementing a multi-tenant system

Example security middleware:

```typescript
function validateCollectionConfig(collectionConfig) {
  // Check for required fields
  if (!collectionConfig.slug || !collectionConfig.fields) {
    throw new Error('Invalid collection configuration')
  }

  // Validate slug (prevent SQL/NoSQL injection)
  if (!/^[a-z0-9-_]+$/.test(collectionConfig.slug)) {
    throw new Error('Invalid collection slug')
  }

  // Validate field names
  for (const field of collectionConfig.fields) {
    if (!/^[a-z0-9-_]+$/.test(field.name)) {
      throw new Error(`Invalid field name: ${field.name}`)
    }
  }

  // Additional validation...
}
```

## Operational Considerations

When implementing dynamic collections, consider these operational aspects:

1. **Persistence**: Store collection definitions in the database to survive restarts
2. **Migrations**: Handle schema migrations for dynamic collections
3. **Backups**: Ensure backup systems capture both schema and data
4. **Performance**: Monitor performance impact of many dynamic collections
5. **Monitoring**: Implement logging and alerting for collection operations

## Example Implementation

Here's a simplified example of a dynamic collection system:

```typescript
import { CollectionConfig, Payload } from 'payload'
import express from 'express'

class DynamicCollectionManager {
  private dynamicCollections: CollectionConfig[] = []

  constructor(private payload: Payload) {
    // Register API endpoint for collection creation
    this.payload.express.app.post(
      '/api/system/collections',
      this.payload.authenticate,
      this.createCollectionHandler.bind(this),
    )

    // Load previously created collections from the database
    this.loadExistingDynamicCollections()
  }

  private async createCollectionHandler(req: express.Request, res: express.Response) {
    try {
      // Verify admin permissions
      if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized' })
      }

      const collectionConfig = req.body

      // Validate configuration
      validateCollectionConfig(collectionConfig)

      // Add the collection
      await this.addCollection(collectionConfig)

      // Store in database for persistence
      await this.payload.create({
        collection: 'collection-registry',
        data: collectionConfig,
      })

      res.status(201).json({ success: true, collection: collectionConfig.slug })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  private async addCollection(collectionConfig: CollectionConfig) {
    // 1. Create database schema
    await createDynamicTable(this.payload, collectionConfig)

    // 2. Register API endpoints
    registerRESTEndpoints(this.payload, collectionConfig)

    // 3. Store in memory
    this.dynamicCollections.push(collectionConfig)

    // 4. Refresh GraphQL schema
    await refreshGraphQLSchema(this.payload, this.dynamicCollections)

    // 5. Notify admin UI
    this.payload.socketServer?.broadcast('collection-added', { collection: collectionConfig })
  }

  private async loadExistingDynamicCollections() {
    // Load collections from database
    const { docs } = await this.payload.find({
      collection: 'collection-registry',
    })

    // Add each collection
    for (const doc of docs) {
      await this.addCollection(doc)
    }
  }
}

// Initialize with payload
export function initDynamicCollections(payload: Payload) {
  return new DynamicCollectionManager(payload)
}
```

## Conclusion

Dynamic collection injection in Payload CMS is an advanced technique that, while not officially supported, can be implemented with careful consideration of the internal architecture. This approach opens up powerful possibilities for building flexible, user-defined data models in your application.

The most practical approach for most use cases is the meta-collections pattern, which provides flexibility while avoiding the complexity of true runtime schema modifications. For applications that absolutely require true dynamic collections, consider reaching out to the Payload team or contributing to the core project to make this functionality officially supported.
