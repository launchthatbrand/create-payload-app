# Building a WordPress-like Plugin System for React with Module Federation

This document explores how to create a flexible, dynamically-loadable plugin system for React applications using module federation, with a specific focus on building extensible PayloadCMS applications.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Core Plugin System](#core-plugin-system)
- [PayloadCMS Integration](#payloadcms-integration)
- [Example: LMS Plugin](#example-lms-plugin)
- [Dynamic Loading Without Restarts](#dynamic-loading-without-restarts)
- [Development and Deployment Considerations](#development-and-deployment-considerations)
- [API Reference](#api-reference)

## Overview

Modern web applications benefit from modularity and extensibility, but implementing a true plugin system that doesn't require rebuilding or restarting the application has been challenging. By combining Module Federation with runtime integrations, we can create a WordPress-like plugin ecosystem for React applications that allows:

1. **Dynamic Loading**: Add new features without rebuilding the host application
2. **Schema Extension**: Extend database schemas and APIs at runtime
3. **UI Integration**: Seamlessly add UI components to predefined extension points
4. **Data Management**: Handle data persistence and retrieval for plugin-specific content
5. **Plugin Marketplace**: Discover and install plugins from a central registry

This approach is particularly valuable for CMS platforms like PayloadCMS, where users may want to extend functionality in a modular way similar to WordPress plugins.

## Architecture

The plugin system consists of several key components:

### 1. Plugin Registry

A central store that manages plugin registration, dependencies, and lifecycle:

```typescript
// Core plugin registry
export class PluginRegistry {
  private plugins: Map<string, PluginDefinition> = new Map()
  private extensionPoints: Map<string, ExtensionPoint> = new Map()

  registerPlugin(plugin: PluginDefinition) {
    // Validate plugin
    // Check dependencies
    // Register plugin
    this.plugins.set(plugin.id, plugin)

    // Initialize plugin if applicable
    if (plugin.initialize && !plugin.initialized) {
      plugin.initialize()
      plugin.initialized = true
    }

    // Register plugin's extensions to extension points
    this.registerExtensions(plugin)

    return this
  }

  registerExtensionPoint(id: string, config: ExtensionPointConfig) {
    this.extensionPoints.set(id, {
      id,
      extensions: [],
      ...config,
    })

    return this
  }

  // More methods for plugin management...
}
```

### 2. Module Federation Configuration

The foundation for loading remote code dynamically:

```typescript
// webpack.config.js
const { ModuleFederationPlugin } = require('webpack').container

module.exports = {
  // ...
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      filename: 'remoteEntry.js',
      remotes: {
        // Dynamically loaded from plugin registry
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        '@plugin-system/core': { singleton: true },
      },
    }),
  ],
}
```

### 3. Extension Points

Predefined locations in the application where plugins can inject content:

```tsx
// ExtensionPoint component
export function ExtensionPoint({ id, context = {} }) {
  const registry = usePluginRegistry()
  const extensions = registry.getExtensionsForPoint(id)

  return (
    <>
      {extensions.map((extension) => {
        // Dynamically load and render the extension
        const ExtensionComponent = extension.component
        return (
          <ErrorBoundary key={extension.id}>
            <ExtensionComponent context={context} />
          </ErrorBoundary>
        )
      })}
    </>
  )
}
```

### 4. Plugin Loader

A service for dynamically discovering and loading plugins at runtime:

```typescript
// PluginLoader
export class PluginLoader {
  constructor(private registry: PluginRegistry) {}

  async loadPlugin(url: string): Promise<void> {
    try {
      // Dynamically add the remote entry script
      await this.loadRemoteScript(url)

      // Initialize the plugin
      const { pluginDefinition } = await window.getPluginDefinition()
      this.registry.registerPlugin(pluginDefinition)

      console.log(`Plugin ${pluginDefinition.id} loaded successfully`)
    } catch (error) {
      console.error(`Failed to load plugin from ${url}:`, error)
    }
  }

  private async loadRemoteScript(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = url
      script.onload = () => resolve()
      script.onerror = (error) => reject(error)
      document.head.appendChild(script)
    })
  }
}
```

## Core Plugin System

The core plugin system provides the fundamental structure and APIs for plugins:

### Plugin Definition

```typescript
export interface PluginDefinition {
  id: string
  name: string
  description: string
  version: string
  dependencies?: { [pluginId: string]: string }
  initialize?: () => void | Promise<void>
  extensions?: Extension[]
  initialized?: boolean
}

export interface Extension {
  id: string
  extensionPointId: string
  component: React.ComponentType<any>
  weight?: number
  conditions?: (context: any) => boolean
}
```

### Extension Points

Extension points are specific locations in the application where plugins can add functionality:

```typescript
export interface ExtensionPoint {
  id: string
  extensions: Extension[]
  renderer?: (extensions: Extension[], context: any) => React.ReactNode
}
```

### Plugin Context Provider

A React context provider for accessing the plugin system:

```tsx
// PluginProvider.tsx
export const PluginContext = React.createContext<{
  registry: PluginRegistry
  loader: PluginLoader
} | null>(null)

export function PluginProvider({ children }) {
  const [registry] = useState(() => new PluginRegistry())
  const [loader] = useState(() => new PluginLoader(registry))

  // Define standard extension points
  useEffect(() => {
    registry
      .registerExtensionPoint('header.right', {})
      .registerExtensionPoint('sidebar.top', {})
      .registerExtensionPoint('sidebar.bottom', {})
      .registerExtensionPoint('content.before', {})
      .registerExtensionPoint('content.after', {})
      .registerExtensionPoint('settings.section', {})
  }, [registry])

  return <PluginContext.Provider value={{ registry, loader }}>{children}</PluginContext.Provider>
}
```

## PayloadCMS Integration

Integrating the plugin system with PayloadCMS requires addressing both the admin UI and the backend:

### 1. Dynamic Collection Creation

The first challenge is dynamically adding collections to Payload without restarting:

```typescript
// Payload plugin manager
export class PayloadPluginManager {
  constructor(private payload: Payload) {}

  async registerCollection(collectionConfig: CollectionConfig) {
    // 1. Create database schema
    await this.createDatabaseSchema(collectionConfig)

    // 2. Register API endpoints
    this.registerAPIEndpoints(collectionConfig)

    // 3. Update admin UI (via websocket)
    this.updateAdminUI(collectionConfig)

    // 4. Refresh GraphQL schema if needed
    if (this.payload.config.graphQL?.enabled) {
      await this.refreshGraphQLSchema(collectionConfig)
    }

    console.log(`Collection ${collectionConfig.slug} registered successfully`)
  }

  // Implementation details...
}
```

### 2. Admin UI Integration

The admin panel needs extension points and a plugin management interface:

```tsx
// Admin UI extension points
export function PayloadAdmin() {
  return (
    <PluginProvider>
      <AdminLayout>
        {/* Plugin management UI */}
        <PluginManager />

        {/* Extension points */}
        <ExtensionPoint id="admin.dashboard.before" />
        <DashboardView />
        <ExtensionPoint id="admin.dashboard.after" />

        {/* Collection list extension point */}
        <ExtensionPoint id="admin.collections.before" />
        <Collections>
          {/* This will render default collections plus plugin collections */}
        </Collections>
        <ExtensionPoint id="admin.collections.after" />

        {/* ... more extension points */}
      </AdminLayout>
    </PluginProvider>
  )
}
```

### 3. Plugin Management UI

A dedicated interface for discovering, installing, and managing plugins:

```tsx
export function PluginManager() {
  const { registry, loader } = usePluginContext()
  const [plugins, setPlugins] = useState<PluginDefinition[]>([])
  const [availablePlugins, setAvailablePlugins] = useState<PluginInfo[]>([])

  // Fetch installed plugins
  useEffect(() => {
    setPlugins(Array.from(registry.getPlugins().values()))
  }, [registry])

  // Fetch available plugins from the registry
  useEffect(() => {
    fetchAvailablePlugins().then(setAvailablePlugins)
  }, [])

  const handleInstallPlugin = async (pluginInfo: PluginInfo) => {
    try {
      await loader.loadPlugin(pluginInfo.remotePath)
      // Update UI
    } catch (error) {
      // Handle error
    }
  }

  return (
    <div className="plugin-manager">
      <h2>Installed Plugins</h2>
      <PluginList plugins={plugins} />

      <h2>Available Plugins</h2>
      <AvailablePluginList plugins={availablePlugins} onInstall={handleInstallPlugin} />
    </div>
  )
}
```

## Example: LMS Plugin

Let's implement a Learning Management System (LMS) plugin to demonstrate the system:

### 1. Plugin Definition

```typescript
// lms-plugin.ts
export const lmsPlugin: PluginDefinition = {
  id: 'lms-plugin',
  name: 'Learning Management System',
  description: 'Adds courses, lessons, topics, and quizzes to PayloadCMS',
  version: '1.0.0',

  // Initialize function runs when the plugin is loaded
  initialize: async () => {
    // Register collections with PayloadCMS
    const payloadPlugin = getPayloadPlugin()

    // Register Course collection
    await payloadPlugin.registerCollection({
      slug: 'courses',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
        },
        {
          name: 'lessons',
          type: 'relationship',
          relationTo: 'lessons',
          hasMany: true,
        },
      ],
    })

    // Register Lesson collection
    await payloadPlugin.registerCollection({
      slug: 'lessons',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
        },
        {
          name: 'topics',
          type: 'relationship',
          relationTo: 'topics',
          hasMany: true,
        },
      ],
    })

    // Register Topic collection
    await payloadPlugin.registerCollection({
      slug: 'topics',
      // ...field definitions
    })

    // Register Quiz collection
    await payloadPlugin.registerCollection({
      slug: 'quizzes',
      // ...field definitions
    })
  },

  // Extension points this plugin targets
  extensions: [
    {
      id: 'lms-admin-menu',
      extensionPointId: 'admin.sidebar',
      component: LMSAdminMenu,
    },
    {
      id: 'lms-dashboard-widget',
      extensionPointId: 'admin.dashboard',
      component: LMSDashboardWidget,
    },
    {
      id: 'course-list-page',
      extensionPointId: 'frontend.routes',
      component: CourseListPage,
    },
  ],
}
```

### 2. Frontend Components

The plugin includes React components for the frontend:

```tsx
// CourseListPage.tsx
export function CourseListPage() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    // Fetch courses from the API
    fetch('/api/courses')
      .then((res) => res.json())
      .then((data) => setCourses(data.docs))
  }, [])

  return (
    <div className="course-list">
      <h1>Available Courses</h1>

      <div className="course-grid">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
```

### 3. Admin UI Extensions

The plugin also extends the admin interface:

```tsx
// LMSAdminMenu.tsx
export function LMSAdminMenu() {
  return (
    <div className="lms-admin-menu">
      <h3>Learning Management</h3>
      <nav>
        <a href="/admin/collections/courses">Courses</a>
        <a href="/admin/collections/lessons">Lessons</a>
        <a href="/admin/collections/topics">Topics</a>
        <a href="/admin/collections/quizzes">Quizzes</a>
      </nav>
    </div>
  )
}
```

## Dynamic Loading Without Restarts

To achieve dynamic loading without server restarts, we need to address several challenges:

### 1. Dynamic Collection Registration

The server needs to support adding collections at runtime:

```typescript
// Server-side collection manager
export class RuntimeCollectionManager {
  constructor(private payload: Payload) {
    // Set up WebSocket connection for admin panel communication
    this.initWebSocket()
  }

  async registerCollection(collectionConfig: CollectionConfig) {
    try {
      // 1. Validate collection config
      this.validateCollectionConfig(collectionConfig)

      // 2. Generate database schema
      await this.createDatabaseSchema(collectionConfig)

      // 3. Add to internal collections registry
      this.payload.collections = [
        ...this.payload.collections,
        {
          config: collectionConfig,
          Model: await this.createModel(collectionConfig),
        },
      ]

      // 4. Register API endpoints dynamically
      this.registerAPIEndpoints(collectionConfig)

      // 5. Update GraphQL schema if needed
      if (this.payload.config.graphQL?.enabled) {
        await this.regenerateGraphQLSchema()
      }

      // 6. Notify admin UI of new collection
      this.notifyAdminUI(collectionConfig)

      return true
    } catch (error) {
      console.error(`Failed to register collection:`, error)
      return false
    }
  }

  // Implementation details for createModel
  private async createModel(collectionConfig: CollectionConfig) {
    const { slug, fields } = collectionConfig

    // Different implementations depending on database adapter
    if (this.payload.db.type === 'mongodb') {
      return this.createMongooseModel(collectionConfig)
    } else if (this.payload.db.type === 'postgres') {
      return this.createSQLModel(collectionConfig)
    }
  }

  // For MongoDB via Mongoose
  private async createMongooseModel(collectionConfig: CollectionConfig) {
    const { slug, fields } = collectionConfig
    const mongoose = this.payload.db.mongoose

    // Convert Payload field configs to Mongoose schema
    const schemaDefinition = this.convertFieldsToMongooseSchema(fields)

    // Create Mongoose schema with timestamps and other options
    const schema = new mongoose.Schema(schemaDefinition, {
      timestamps: true,
      minimize: false, // Don't remove empty objects
      collection: slug, // Collection name in database
    })

    // Add hooks
    schema.pre('save', function (next) {
      // Add custom save functionality
      next()
    })

    // Add indexes for searchable fields
    fields.forEach((field) => {
      if (field.index) {
        schema.index({ [field.name]: 1 })
      }
    })

    // Register the model
    const Model = mongoose.model(slug, schema)

    return Model
  }

  // For SQL databases (PostgreSQL, MySQL, etc.)
  private async createSQLModel(collectionConfig: CollectionConfig) {
    const { slug, fields } = collectionConfig

    // If using Drizzle ORM
    if (this.payload.db.drizzle) {
      // Define table schema for Drizzle
      const tableSchema = {}

      // Add ID and timestamp columns
      tableSchema.id = { type: 'serial', primaryKey: true }
      tableSchema.createdAt = {
        type: 'timestamp',
        notNull: true,
        default: this.payload.db.drizzle.sql`CURRENT_TIMESTAMP`,
      }
      tableSchema.updatedAt = {
        type: 'timestamp',
        notNull: true,
        default: this.payload.db.drizzle.sql`CURRENT_TIMESTAMP`,
      }

      // Convert Payload fields to SQL columns
      fields.forEach((field) => {
        tableSchema[field.name] = this.convertFieldToSQLColumn(field)
      })

      // Create table if not exists
      const tableName = slug
      await this.payload.db.drizzle.execute(
        this.payload.db.drizzle
          .sql`CREATE TABLE IF NOT EXISTS ${tableName} (/* schema definition */)`,
      )

      // Create a model object that mimics Payload's internal model structure
      return {
        tableName,
        schema: tableSchema,
        create: async (data) => {
          /* implementation */
        },
        find: async (query) => {
          /* implementation */
        },
        findById: async (id) => {
          /* implementation */
        },
        update: async (id, data) => {
          /* implementation */
        },
        delete: async (id) => {
          /* implementation */
        },
      }
    }

    // Implementations for other SQL adapters...
  }

  // More implementation details for other steps...

  // Helper to validate collection configuration
  private validateCollectionConfig(config: CollectionConfig) {
    // Ensure required properties exist
    if (!config.slug) {
      throw new Error('Collection slug is required')
    }

    if (!config.fields || !Array.isArray(config.fields)) {
      throw new Error('Collection fields must be an array')
    }

    // Validate slug format (alphanumeric and hyphens only)
    if (!/^[a-z0-9-]+$/.test(config.slug)) {
      throw new Error('Collection slug must contain only lowercase letters, numbers, and hyphens')
    }

    // Ensure slug is not reserved
    const reservedSlugs = [
      'admin',
      'api',
      'assets',
      'media',
      'payload',
      'graphql',
      'auth',
      'verify',
    ]

    if (reservedSlugs.includes(config.slug)) {
      throw new Error(`Collection slug '${config.slug}' is reserved`)
    }

    // Ensure slug doesn't conflict with existing collections
    const existingCollectionSlugs = this.payload.collections.map((c) => c.config.slug)
    if (existingCollectionSlugs.includes(config.slug)) {
      throw new Error(`Collection with slug '${config.slug}' already exists`)
    }

    // Validate fields
    config.fields.forEach((field) => {
      if (!field.name) {
        throw new Error('Field name is required')
      }

      if (!field.type) {
        throw new Error(`Field '${field.name}' must have a type`)
      }

      // Additional field validation...
    })
  }

  // Register API endpoints for the new collection
  private registerAPIEndpoints(collectionConfig: CollectionConfig) {
    const { slug } = collectionConfig
    const app = this.payload.express.app

    // Standard REST endpoints
    app.get(`/api/${slug}`, this.payload.authenticate, async (req, res, next) => {
      try {
        // Find the collection in the registry
        const collection = this.payload.collections.find((c) => c.config.slug === slug)

        if (!collection) {
          return res.status(404).json({ error: `Collection '${slug}' not found` })
        }

        // Attach collection to the request for access control
        req.collection = collection

        // Hand off to Payload's existing endpoint handler
        // This is tricky as we're tapping into Payload's internal request handling
        await this.payload.endpoints.find(req, res, next)
      } catch (error) {
        next(error)
      }
    })

    // Similar for other endpoints (findById, create, update, delete)
    app.get(`/api/${slug}/:id`, this.payload.authenticate, async (req, res, next) => {
      /* similar implementation */
    })

    app.post(`/api/${slug}`, this.payload.authenticate, async (req, res, next) => {
      /* similar implementation */
    })

    app.patch(`/api/${slug}/:id`, this.payload.authenticate, async (req, res, next) => {
      /* similar implementation */
    })

    app.delete(`/api/${slug}/:id`, this.payload.authenticate, async (req, res, next) => {
      /* similar implementation */
    })
  }

  // Update GraphQL schema to include new collection
  private async regenerateGraphQLSchema() {
    if (!this.payload.config.graphQL?.enabled) return

    // Access the GraphQL schema builder
    // This is internal to Payload and may change between versions
    const schema = await this.payload.buildGraphQLSchema({
      collections: this.payload.collections.map((c) => c.config),
      globals: this.payload.globals.map((g) => g.config),
    })

    // Replace the existing GraphQL schema
    this.payload.graphQL.schema = schema

    // Re-register the GraphQL endpoint
    const app = this.payload.express.app

    // Find and remove the existing GraphQL route
    const graphQLPath = this.payload.config.graphQL.path || '/api/graphql'
    const stack = app._router.stack
    const graphQLLayerIndex = stack.findIndex(
      (layer) => layer.route && layer.route.path === graphQLPath,
    )

    if (graphQLLayerIndex !== -1) {
      app._router.stack.splice(graphQLLayerIndex, 1)
    }

    // Register the new GraphQL endpoint with the updated schema
    app.use(
      graphQLPath,
      graphqlHTTP({
        schema: this.payload.graphQL.schema,
        graphiql: this.payload.config.graphQL.graphiQL,
        context: ({ req }) => ({ req, user: req.user }),
      }),
    )
  }
}
```

#### Additional Collection Registry Considerations

When adding collections to Payload's internal registry at runtime, there are several important considerations to keep in mind:

1. **Internal Caching**: Payload may maintain internal caches that need to be invalidated when collections change:

```typescript
// Clear internal caches
private clearCaches() {
  // Access control cache might store collection access rules
  if (this.payload.cache?.accessControl) {
    this.payload.cache.accessControl.clear()
  }

  // Schema cache for GraphQL
  if (this.payload.cache?.schema) {
    this.payload.cache.schema.clear()
  }
}
```

2. **Collection Relationships**: New collections need to be properly linked to existing ones:

```typescript
// Update relationship fields in other collections
private updateRelationships(newCollectionSlug: string) {
  // Look through all collections for relationship fields
  this.payload.collections.forEach(collection => {
    if (collection.config.slug === newCollectionSlug) return

    collection.config.fields.forEach(field => {
      if (field.type === 'relationship' && field.relationTo) {
        if (Array.isArray(field.relationTo) && !field.relationTo.includes(newCollectionSlug)) {
          // Add the new collection as a potential relation
          field.relationTo.push(newCollectionSlug)
        }
      }
    })
  })
}
```

3. **Admin Routes**: Payload's admin router needs to be made aware of new collections:

```typescript
// Update admin router
private updateAdminRouter(collectionConfig: CollectionConfig) {
  const { slug } = collectionConfig

  // This is highly dependent on Payload internals
  // Payload might regenerate admin routes on startup rather than dynamically
  // This is a conceptual example and may need adaptation
  if (this.payload.admin?.router) {
    const adminRouter = this.payload.admin.router

    // Register collection CRUD routes
    adminRouter.get(`/collections/${slug}`, (req, res) => {
      res.send(adminComponent('CollectionList', { collection: slug }))
    })

    adminRouter.get(`/collections/${slug}/create`, (req, res) => {
      res.send(adminComponent('CollectionEdit', { collection: slug, id: 'create' }))
    })

    adminRouter.get(`/collections/${slug}/:id`, (req, res) => {
      res.send(adminComponent('CollectionEdit', { collection: slug, id: req.params.id }))
    })
  }
}
```

4. **Hooks and Extensions**: Collections can have hooks that need proper registration:

```typescript
// Register collection hooks
private registerCollectionHooks(collectionConfig: CollectionConfig) {
  const { slug, hooks } = collectionConfig

  if (!hooks) return

  // Register each hook if provided
  if (hooks.beforeOperation) {
    this.payload.hooks.collection[slug] = this.payload.hooks.collection[slug] || {}
    this.payload.hooks.collection[slug].beforeOperation = hooks.beforeOperation
  }

  // Other hooks like beforeValidate, afterChange, etc.
  // ...
}
```

5. **Admin UI State Sync**: The admin UI state needs to be updated across all clients:

```typescript
// Send more detailed updates to admin UI
notifyAdminUI(collectionConfig: CollectionConfig) {
  if (!this.wss) return

  // Send both the collection config and operation type
  this.wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: 'collection-added',
        collection: {
          slug: collectionConfig.slug,
          labels: collectionConfig.admin?.labels || {
            singular: formatLabels(collectionConfig.slug),
            plural: formatLabels(`${collectionConfig.slug}s`),
          },
          admin: collectionConfig.admin,
          fields: collectionConfig.fields.map(field => ({
            name: field.name,
            type: field.type,
            label: field.label,
            required: !!field.required,
          })),
        }
      }))
    }
  })
}
```

With these implementations, a page refresh of the admin UI would show the new collections because:

1. The collection is properly registered in Payload's internal registry
2. The API endpoints for the collection are available
3. The database schema has been created
4. The admin UI renders collections dynamically based on what's in the registry

The UI update via WebSockets is optional but provides a better user experience by showing new collections immediately without requiring a refresh.

### 2. WebSocket Communication

WebSockets enable real-time updates between the server and admin UI:

```typescript
// Server-side WebSocket initialization
initWebSocket() {
  const wss = new WebSocket.Server({ server: this.payload.express.server })

  wss.on('connection', (ws) => {
    // Handle admin panel connections
    ws.on('message', async (message) => {
      const data = JSON.parse(message.toString())

      if (data.type === 'install-plugin') {
        // Handle plugin installation request
        const result = await this.installPlugin(data.pluginUrl)
        ws.send(JSON.stringify({
          type: 'plugin-installed',
          success: result.success,
          error: result.error
        }))
      }
    })
  })

  // Store for broadcasting updates
  this.wss = wss
}

// Notify admin UI of schema changes
notifyAdminUI(change) {
  if (this.wss) {
    this.wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'schema-updated',
          change
        }))
      }
    })
  }
}
```

### 3. Frontend Dynamic Loading

The frontend needs to handle dynamic updates to the available collections and routes:

```tsx
// AdminPanel.tsx with dynamic updates
export function AdminPanel() {
  const [collections, setCollections] = useState([])

  useEffect(() => {
    // Set up WebSocket connection for admin updates
    const ws = new WebSocket('ws://localhost:3000')

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)

      if (data.type === 'schema-updated') {
        // Update collections in state
        setCollections((prev) => [...prev, data.change])
      }
    }

    // Cleanup
    return () => ws.close()
  }, [])

  // Render admin UI with dynamic collections
  return (
    <AdminLayout>
      <Sidebar>
        <CollectionNavigation collections={collections} />
      </Sidebar>
      <MainContent>
        <Switch>
          {collections.map((collection) => (
            <Route
              key={collection.slug}
              path={`/admin/collections/${collection.slug}`}
              component={() => <CollectionView collection={collection} />}
            />
          ))}
        </Switch>
      </MainContent>
    </AdminLayout>
  )
}
```

## Development and Deployment Considerations

Creating a plugin system with runtime loading has important considerations:

### 1. Plugin Versioning

Plugins need proper versioning and dependency management:

```typescript
// Plugin version compatibility check
function checkPluginCompatibility(plugin: PluginDefinition): boolean {
  // Check system version compatibility
  if (!semverSatisfies(SYSTEM_VERSION, plugin.systemCompatibility)) {
    console.error(`Plugin ${plugin.id} requires system version ${plugin.systemCompatibility}`)
    return false
  }

  // Check dependencies
  for (const [depId, versionRange] of Object.entries(plugin.dependencies || {})) {
    const dep = registry.getPlugin(depId)
    if (!dep) {
      console.error(`Plugin ${plugin.id} depends on ${depId} which is not installed`)
      return false
    }

    if (!semverSatisfies(dep.version, versionRange)) {
      console.error(
        `Plugin ${plugin.id} requires ${depId} version ${versionRange}, but ${dep.version} is installed`,
      )
      return false
    }
  }

  return true
}
```

### 2. Security Considerations

Dynamic loading of code creates security concerns:

```typescript
// Plugin security validation
async function validatePluginSecurity(pluginUrl: string): Promise<boolean> {
  // 1. Check if plugin is from trusted source
  if (!isTrustedDomain(pluginUrl)) {
    console.error(`Plugin URL ${pluginUrl} is not from a trusted domain`)
    return false
  }

  // 2. Verify plugin signature if available
  try {
    const { signature, publicKey } = await fetchPluginSignature(pluginUrl)
    if (signature && publicKey) {
      return verifySignature(pluginUrl, signature, publicKey)
    }
  } catch (error) {
    console.error(`Failed to verify plugin signature: ${error}`)
    return false
  }

  // 3. Sandbox plugin code (advanced)
  // ...

  return true
}
```

### 3. Data Persistence

Plugins need to persist their existence across restarts:

```typescript
// Plugin persistence
async function persistPluginRegistration(plugin: PluginDefinition) {
  try {
    // Store in database
    await db.collection('plugins').updateOne(
      { id: plugin.id },
      {
        $set: {
          id: plugin.id,
          name: plugin.name,
          version: plugin.version,
          enabled: true,
          installedAt: new Date(),
        },
      },
      { upsert: true },
    )

    // Store collection configs
    if (plugin.collections) {
      for (const collection of plugin.collections) {
        await db.collection('plugin_collections').updateOne(
          {
            pluginId: plugin.id,
            slug: collection.slug,
          },
          {
            $set: {
              pluginId: plugin.id,
              config: collection,
            },
          },
          { upsert: true },
        )
      }
    }
  } catch (error) {
    console.error(`Failed to persist plugin registration:`, error)
  }
}
```

### 4. Auto-loading on Startup

Plugins should auto-load when the system restarts:

```typescript
// Auto-load plugins on system startup
async function loadPersistentPlugins() {
  try {
    // Get all enabled plugins from DB
    const plugins = await db.collection('plugins').find({ enabled: true }).toArray()

    // Load each plugin
    for (const plugin of plugins) {
      try {
        await pluginLoader.loadPlugin(plugin.remoteUrl)
      } catch (error) {
        console.error(`Failed to auto-load plugin ${plugin.id}:`, error)
      }
    }

    console.log(`Auto-loaded ${plugins.length} plugins`)
  } catch (error) {
    console.error(`Failed to load persistent plugins:`, error)
  }
}
```

## API Reference

### Plugin System API

```typescript
interface PluginSystem {
  // Core methods
  registerPlugin(plugin: PluginDefinition): boolean
  unregisterPlugin(pluginId: string): boolean
  getPlugin(pluginId: string): PluginDefinition | undefined
  listPlugins(): PluginDefinition[]

  // Extension point methods
  registerExtensionPoint(id: string, config: ExtensionPointConfig): void
  registerExtension(extension: Extension): void
  getExtensionsForPoint(pointId: string, context?: any): Extension[]

  // Plugin loading
  loadPlugin(url: string): Promise<boolean>
  enablePlugin(pluginId: string): Promise<boolean>
  disablePlugin(pluginId: string): Promise<boolean>
}
```

### PayloadCMS Plugin API

```typescript
interface PayloadPluginAPI {
  // Collection management
  registerCollection(config: CollectionConfig): Promise<boolean>
  updateCollection(slug: string, config: Partial<CollectionConfig>): Promise<boolean>
  removeCollection(slug: string): Promise<boolean>

  // Global management
  registerGlobal(config: GlobalConfig): Promise<boolean>
  updateGlobal(slug: string, config: Partial<GlobalConfig>): Promise<boolean>
  removeGlobal(slug: string): Promise<boolean>

  // Admin UI extensions
  registerAdminComponent(extension: AdminExtension): void

  // Frontend routes
  registerRoute(route: RouteDefinition): void
}
```

### Plugin Definition

```typescript
interface PluginDefinition {
  id: string
  name: string
  description: string
  version: string
  systemCompatibility?: string
  dependencies?: Record<string, string>

  // Collections and globals
  collections?: CollectionConfig[]
  globals?: GlobalConfig[]

  // Extension points
  extensions?: Extension[]

  // Lifecycle methods
  initialize?: () => void | Promise<void>
  activate?: () => void | Promise<void>
  deactivate?: () => void | Promise<void>
  uninstall?: () => void | Promise<void>
}
```

This plugin system architecture enables a truly modular and extensible approach to building applications with PayloadCMS, providing a WordPress-like ecosystem for adding new functionality without server restarts.
