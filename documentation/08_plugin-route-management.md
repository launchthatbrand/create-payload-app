# Managing Plugin Route Conflicts in a Dynamic CMS

This document explores strategies for handling route conflicts between plugins in a dynamic Payload CMS and Next.js Multi-Zone architecture, focusing on creating a WordPress-like experience for plugin installation and route management.

## Table of Contents

- [The Route Conflict Challenge](#the-route-conflict-challenge)
- [Plugin Installation Flow with Route Validation](#plugin-installation-flow-with-route-validation)
- [Real-Time Route Management Interface](#real-time-route-management-interface)
- [Efficient Route Storage and Resolution](#efficient-route-storage-and-resolution)
- [Implementation Strategy](#implementation-strategy)
- [Performance Considerations](#performance-considerations)

## The Route Conflict Challenge

In a dynamic plugin system where multiple plugins can define frontend routes, conflicts are inevitable. For example:

- A blog plugin wants to use `/posts`
- A document manager plugin also wants to use `/posts`
- A course plugin wants to register `/courses` and `/lessons`

Without proper management, these conflicts would create unpredictable behavior as plugins compete for the same routes. Unlike traditional Next.js applications with file-based routing, our system needs to:

1. Detect route conflicts at installation time
2. Provide visual feedback to administrators
3. Allow route customization without editing code
4. Efficiently resolve routes at runtime

## Plugin Installation Flow with Route Validation

### 1. Pre-Installation Validation

When a user selects a plugin to install, before actual installation begins:

```typescript
// plugin-admin/components/InstallationWizard.tsx
import { useState, useEffect } from 'react'
import { fetchPluginManifest, validateRoutes } from '../lib/plugin-api'

export function InstallationWizard({ pluginId }) {
  const [manifest, setManifest] = useState(null)
  const [routeConflicts, setRouteConflicts] = useState([])
  const [customizedRoutes, setCustomizedRoutes] = useState({})
  const [step, setStep] = useState('loading')

  // Fetch plugin manifest on load
  useEffect(() => {
    async function loadManifest() {
      try {
        const manifest = await fetchPluginManifest(pluginId)
        setManifest(manifest)

        // Validate routes against existing plugins
        const conflicts = await validateRoutes(manifest.routes)
        setRouteConflicts(conflicts)

        // Determine next step based on conflicts
        setStep(conflicts.length > 0 ? 'resolve-conflicts' : 'confirm')
      } catch (error) {
        console.error('Failed to load plugin manifest:', error)
        setStep('error')
      }
    }

    loadManifest()
  }, [pluginId])

  // Handle route customization
  function handleRouteChange(originalPath, newPath) {
    setCustomizedRoutes(prev => ({
      ...prev,
      [originalPath]: newPath
    }))

    // Re-validate the updated route set
    validateRoutes([
      ...manifest.routes.map(route => ({
        ...route,
        path: customizedRoutes[route.path] || route.path
      }))
    ]).then(setRouteConflicts)
  }

  // Render appropriate step
  if (step === 'loading') return <LoadingScreen />
  if (step === 'error') return <ErrorScreen />

  if (step === 'resolve-conflicts') {
    return (
      <RouteConflictResolver
        conflicts={routeConflicts}
        routes={manifest.routes}
        customizedRoutes={customizedRoutes}
        onRouteChange={handleRouteChange}
        onContinue={() => setStep('confirm')}
      />
    )
  }

  if (step === 'confirm') {
    return (
      <ConfirmInstallation
        plugin={manifest}
        customizedRoutes={customizedRoutes}
        onInstall={handleInstall}
        onBack={() => setStep('resolve-conflicts')}
      />
    )
  }
}
```

### 2. Visual Conflict Resolution UI

The conflict resolution interface should clearly indicate conflicts and allow easy route customization:

```tsx
// plugin-admin/components/RouteConflictResolver.tsx
export function RouteConflictResolver({
  conflicts,
  routes,
  customizedRoutes,
  onRouteChange,
  onContinue,
}) {
  return (
    <div className="route-conflict-resolver">
      <h2>Route Conflicts Detected</h2>
      <p>
        This plugin has routes that conflict with existing plugins. Please customize the routes
        below:
      </p>

      <div className="routes-list">
        {routes.map((route) => {
          const conflict = conflicts.find(
            (c) => c.path === (customizedRoutes[route.path] || route.path),
          )

          return (
            <div key={route.path} className={`route-item ${conflict ? 'has-conflict' : ''}`}>
              <div className="route-info">
                <div className="route-path">
                  <label htmlFor={`route-${route.path}`}>Route Path:</label>
                  <input
                    id={`route-${route.path}`}
                    type="text"
                    value={customizedRoutes[route.path] || route.path}
                    onChange={(e) => onRouteChange(route.path, e.target.value)}
                    className={conflict ? 'input-error' : ''}
                  />
                </div>

                <div className="route-component">
                  Component: <code>{route.component}</code>
                </div>
              </div>

              {conflict && (
                <div className="conflict-warning">
                  <span className="warning-icon">⚠️</span>
                  <span>
                    Conflicts with: {conflict.pluginName} ({conflict.pluginId})
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="actions">
        <button disabled={conflicts.length > 0} onClick={onContinue} className="primary-button">
          Continue
        </button>
        <p className="help-text">
          {conflicts.length > 0
            ? 'Please resolve all conflicts before continuing'
            : 'All routes are valid'}
        </p>
      </div>
    </div>
  )
}
```

### 3. Custom Route Storage

When a plugin is installed with customized routes, store the adjustments:

```typescript
// server/services/plugin-installer.ts
export async function installPlugin(pluginId, options = {}) {
  const { customizedRoutes = {} } = options

  try {
    // 1. Fetch the plugin package
    const plugin = await fetchPluginPackage(pluginId)

    // 2. Store route customizations in the database
    await storePluginRouteCustomizations(pluginId, customizedRoutes)

    // 3. Install the plugin with customized routes
    const installedPlugin = await performPluginInstallation(plugin, {
      customizedRoutes,
    })

    // 4. Update route registry
    await updateRouteRegistry()

    return {
      success: true,
      plugin: installedPlugin,
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    }
  }
}

async function storePluginRouteCustomizations(pluginId, customizations) {
  const payload = getPayloadInstance()

  // Check if customizations record exists
  const existing = await payload.find({
    collection: 'plugin-route-customizations',
    where: {
      pluginId: { equals: pluginId },
    },
  })

  if (existing.docs.length > 0) {
    // Update existing record
    await payload.update({
      collection: 'plugin-route-customizations',
      id: existing.docs[0].id,
      data: {
        routes: customizations,
      },
    })
  } else {
    // Create new record
    await payload.create({
      collection: 'plugin-route-customizations',
      data: {
        pluginId,
        routes: customizations,
      },
    })
  }
}
```

## Real-Time Route Management Interface

### 1. Route Management Dashboard

After plugins are installed, users need a central place to view and manage all plugin routes:

```tsx
// plugin-admin/pages/plugin-routes.tsx
import { useState, useEffect } from 'react'
import { fetchPluginRoutes, updatePluginRoute } from '../lib/plugin-api'

export default function PluginRoutesManager() {
  const [pluginRoutes, setPluginRoutes] = useState([])
  const [conflicts, setConflicts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingRoute, setEditingRoute] = useState(null)

  useEffect(() => {
    fetchPluginRoutes()
      .then(({ routes, conflicts }) => {
        setPluginRoutes(routes)
        setConflicts(conflicts)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Failed to load plugin routes:', error)
        setIsLoading(false)
      })
  }, [])

  async function handleRouteUpdate(pluginId, originalPath, newPath) {
    try {
      const result = await updatePluginRoute(pluginId, originalPath, newPath)

      if (result.success) {
        // Update local state
        setPluginRoutes(result.routes)
        setConflicts(result.conflicts)
        setEditingRoute(null)
      }
    } catch (error) {
      console.error('Failed to update route:', error)
    }
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="plugin-routes-manager">
      <h1>Manage Plugin Routes</h1>

      <div className="route-groups">
        {pluginRoutes.map((plugin) => (
          <div key={plugin.id} className="plugin-route-group">
            <h2>{plugin.name}</h2>

            <div className="routes-list">
              {plugin.routes.map((route) => {
                const conflict = conflicts.find(
                  (c) => c.path === route.currentPath && c.pluginId !== plugin.id,
                )

                return (
                  <div
                    key={route.originalPath}
                    className={`route-item ${conflict ? 'has-conflict' : ''}`}
                  >
                    {editingRoute === `${plugin.id}:${route.originalPath}` ? (
                      <div className="route-edit">
                        <input
                          type="text"
                          defaultValue={route.currentPath}
                          ref={(input) => input && input.focus()}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleRouteUpdate(plugin.id, route.originalPath, e.target.value)
                            } else if (e.key === 'Escape') {
                              setEditingRoute(null)
                            }
                          }}
                        />
                        <div className="edit-actions">
                          <button
                            onClick={() =>
                              handleRouteUpdate(
                                plugin.id,
                                route.originalPath,
                                document.querySelector(`input[type="text"]`).value,
                              )
                            }
                          >
                            Save
                          </button>
                          <button onClick={() => setEditingRoute(null)}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div className="route-display">
                        <div className="route-path">
                          <code>{route.currentPath}</code>
                          <button
                            className="edit-button"
                            onClick={() => setEditingRoute(`${plugin.id}:${route.originalPath}`)}
                          >
                            Edit
                          </button>
                        </div>

                        <div className="route-details">
                          <span>Component: {route.component}</span>
                          {route.originalPath !== route.currentPath && (
                            <span className="customized-badge">
                              Customized (original: {route.originalPath})
                            </span>
                          )}
                        </div>

                        {conflict && (
                          <div className="conflict-warning">
                            <span className="warning-icon">⚠️</span>
                            <span>Conflicts with: {conflict.pluginName}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {conflicts.length > 0 && (
        <div className="conflicts-summary">
          <h3>⚠️ Warning: Route Conflicts Detected</h3>
          <p>
            There are {conflicts.length} route conflicts in your plugins. Please resolve them to
            ensure your application works correctly.
          </p>
        </div>
      )}
    </div>
  )
}
```

### 2. Route Update API

Creating a robust API for route management:

```typescript
// server/api/plugin-routes.ts
import { PayloadRequest } from 'payload/types'
import { getPluginRegistry, updatePluginRouteMap } from '../services/plugin-service'

export async function updateRouteHandler(req: PayloadRequest, res: Response) {
  try {
    const { pluginId, originalPath, newPath } = req.body

    if (!pluginId || !originalPath || !newPath) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      })
    }

    // Check if user has permission
    if (!req.user || !req.user.roles?.includes('admin')) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized',
      })
    }

    // Update the route
    const { routes, conflicts } = await updatePluginRoute(pluginId, originalPath, newPath)

    // Return updated routes and conflicts
    return res.status(200).json({
      success: true,
      routes,
      conflicts,
    })
  } catch (error) {
    console.error('Route update error:', error)
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

async function updatePluginRoute(pluginId, originalPath, newPath) {
  const payload = getPayloadInstance()

  // Fetch current customizations
  const existingResult = await payload.find({
    collection: 'plugin-route-customizations',
    where: {
      pluginId: { equals: pluginId },
    },
  })

  let routeCustomizations = {}
  let customizationId = null

  if (existingResult.docs.length > 0) {
    routeCustomizations = existingResult.docs[0].routes || {}
    customizationId = existingResult.docs[0].id
  }

  // Update the customization
  routeCustomizations = {
    ...routeCustomizations,
    [originalPath]: newPath,
  }

  // Save to database
  if (customizationId) {
    await payload.update({
      collection: 'plugin-route-customizations',
      id: customizationId,
      data: {
        routes: routeCustomizations,
      },
    })
  } else {
    await payload.create({
      collection: 'plugin-route-customizations',
      data: {
        pluginId,
        routes: routeCustomizations,
      },
    })
  }

  // Update the runtime route map
  await updatePluginRouteMap()

  // Fetch updated routes and conflicts
  const registry = await getPluginRegistry()

  return {
    routes: registry.plugins.map((plugin) => ({
      id: plugin.id,
      name: plugin.name,
      routes: plugin.routes.map((route) => ({
        originalPath: route.originalPath,
        currentPath: route.path,
        component: route.component,
      })),
    })),
    conflicts: registry.conflicts,
  }
}
```

## Efficient Route Storage and Resolution

### 1. Database Schema for Route Storage

Create an efficient database schema to store route customizations:

```typescript
// collections/PluginRouteCustomizations.ts
import { CollectionConfig } from 'payload/types'

export const PluginRouteCustomizations: CollectionConfig = {
  slug: 'plugin-route-customizations',
  admin: {
    useAsTitle: 'pluginId',
    description: 'Customized routes for plugins',
    // Hide from admin sidebar since it will be managed through the plugin UI
    hidden: false,
  },
  access: {
    // Only admins can manage route customizations
    read: ({ req }) => req.user?.roles?.includes('admin') || false,
    update: ({ req }) => req.user?.roles?.includes('admin') || false,
    create: ({ req }) => req.user?.roles?.includes('admin') || false,
    delete: ({ req }) => req.user?.roles?.includes('admin') || false,
  },
  fields: [
    {
      name: 'pluginId',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'routes',
      type: 'json',
      required: true,
      defaultValue: {},
    },
    {
      name: 'lastUpdated',
      type: 'date',
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeChange: [() => new Date()],
      },
    },
  ],
}
```

### 2. In-Memory Route Registry with Trie Structure

For efficient route resolution, use a trie data structure to speed up route lookups:

```typescript
// server/services/route-registry.ts
class RouteTrie {
  private root: RouteNode = {
    children: {},
    isEndOfRoute: false,
    handler: null,
  }

  constructor() {}

  // Insert a route path into the trie
  insert(path: string, handler: RouteHandler): void {
    let node = this.root
    const parts = this.normalizePath(path).split('/').filter(Boolean)

    for (const part of parts) {
      // Handle dynamic route parts
      const isDynamic = part.startsWith(':') || part.startsWith('[')
      const partKey = isDynamic ? '*' : part

      if (!node.children[partKey]) {
        node.children[partKey] = {
          children: {},
          isEndOfRoute: false,
          handler: null,
          paramName: isDynamic ? this.extractParamName(part) : null,
        }
      }

      node = node.children[partKey]
    }

    node.isEndOfRoute = true
    node.handler = handler
  }

  // Find a handler for a given path
  find(path: string): { handler: RouteHandler | null; params: Record<string, string> } {
    let node = this.root
    const parts = this.normalizePath(path).split('/').filter(Boolean)
    const params: Record<string, string> = {}

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]

      // First try exact match
      if (node.children[part]) {
        node = node.children[part]
        continue
      }

      // Then try dynamic match
      if (node.children['*']) {
        const dynamicNode = node.children['*']
        node = dynamicNode

        if (dynamicNode.paramName) {
          params[dynamicNode.paramName] = part
        }

        continue
      }

      // No match found
      return { handler: null, params: {} }
    }

    return {
      handler: node.isEndOfRoute ? node.handler : null,
      params,
    }
  }

  private normalizePath(path: string): string {
    return path.startsWith('/') ? path : `/${path}`
  }

  private extractParamName(part: string): string {
    // Extract parameter name from [param] or :param format
    if (part.startsWith('[') && part.endsWith(']')) {
      return part.slice(1, -1)
    }

    if (part.startsWith(':')) {
      return part.slice(1)
    }

    return 'param'
  }
}

// Types
interface RouteNode {
  children: Record<string, RouteNode>
  isEndOfRoute: boolean
  handler: RouteHandler | null
  paramName?: string | null
}

interface RouteHandler {
  pluginId: string
  component: string
  priority: number
}

// Usage
export class RouteRegistry {
  private routeTrie = new RouteTrie()
  private routes: Record<string, RouteHandler> = {}
  private conflicts: RouteConflict[] = []

  constructor() {}

  // Build the registry from plugins and customizations
  async build() {
    const payload = getPayloadInstance()

    // 1. Fetch all active plugins
    const plugins = await payload.find({
      collection: 'plugins',
      where: {
        active: { equals: true },
      },
    })

    // 2. Fetch all route customizations
    const customizations = await payload.find({
      collection: 'plugin-route-customizations',
    })

    // Create a map of customizations by plugin ID for quick lookup
    const customizationMap = customizations.docs.reduce((acc, doc) => {
      acc[doc.pluginId] = doc.routes || {}
      return acc
    }, {})

    // Clear existing registry
    this.routeTrie = new RouteTrie()
    this.routes = {}
    this.conflicts = []

    // 3. Process each plugin's routes
    for (const plugin of plugins.docs) {
      const customRoutes = customizationMap[plugin.id] || {}

      for (const route of plugin.routes) {
        const customPath = customRoutes[route.path] || route.path

        // Check for conflicts
        if (this.routes[customPath]) {
          this.conflicts.push({
            path: customPath,
            pluginId: plugin.id,
            pluginName: plugin.name,
            conflictWithPluginId: this.routes[customPath].pluginId,
          })

          // Skip adding this route to avoid overriding
          // the existing route with potentially lower priority
          if (this.routes[customPath].priority >= (route.priority || 0)) {
            continue
          }
        }

        // Add to flat routes map
        this.routes[customPath] = {
          pluginId: plugin.id,
          component: route.component,
          priority: route.priority || 0,
        }

        // Add to trie for efficient lookup
        this.routeTrie.insert(customPath, {
          pluginId: plugin.id,
          component: route.component,
          priority: route.priority || 0,
        })
      }
    }

    // Return conflicts for logging/monitoring
    return this.conflicts
  }

  // Find a handler for a path
  findHandler(path: string) {
    return this.routeTrie.find(path)
  }

  // Get all conflicts
  getConflicts() {
    return this.conflicts
  }

  // Get all routes
  getRoutes() {
    return this.routes
  }
}

// Create singleton
let registryInstance: RouteRegistry | null = null

export function getRouteRegistry() {
  if (!registryInstance) {
    registryInstance = new RouteRegistry()
  }
  return registryInstance
}

export async function rebuildRouteRegistry() {
  const registry = getRouteRegistry()
  return await registry.build()
}
```

### 3. Middleware for Efficient Route Resolution

Use the trie-based route registry in a middleware for fast resolution:

```typescript
// plugin-router-zone/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// In-memory route cache, refreshed via webhook when routes change
let routeCache = null
let lastCacheUpdate = 0
const CACHE_TTL = 60 * 1000 // 1 minute cache TTL

async function getRouteMapping() {
  const now = Date.now()

  // Refresh cache if expired
  if (!routeCache || now - lastCacheUpdate > CACHE_TTL) {
    const response = await fetch(`${process.env.API_URL}/api/plugin-routes`)

    if (!response.ok) {
      throw new Error(`Failed to fetch route mapping: ${response.statusText}`)
    }

    const data = await response.json()
    routeCache = data.routes
    lastCacheUpdate = now
  }

  return routeCache
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip for static files and certain paths
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.') // Static files usually have extensions
  ) {
    return NextResponse.next()
  }

  try {
    // Get route mapping
    const routeMap = await getRouteMapping()

    // Find matching route - this would be more efficient with a proper trie
    // but we're using a simplified approach for the middleware
    let bestMatch = null
    let bestMatchLength = 0

    for (const route in routeMap) {
      // Exact match
      if (route === pathname) {
        bestMatch = routeMap[route]
        break
      }

      // Partial match (for routes like /courses/:id)
      if (pathname.startsWith(route) && route.length > bestMatchLength) {
        bestMatch = routeMap[route]
        bestMatchLength = route.length
      }
    }

    if (bestMatch) {
      // Rewrite to the plugin handler with component info
      const url = new URL('/plugin-route', request.url)
      url.searchParams.set('component', bestMatch.component)
      url.searchParams.set('pluginId', bestMatch.pluginId)
      url.searchParams.set('originalPath', pathname)

      return NextResponse.rewrite(url)
    }
  } catch (error) {
    console.error('Route resolution error:', error)
  }

  // No matching route found, continue to 404
  return NextResponse.next()
}
```

## Implementation Strategy

To implement this system efficiently:

### 1. Database Structure

Create these essential collections:

```typescript
// Plugins collection
{
  id: string;
  name: string;
  version: string;
  active: boolean;
  manifest: {
    routes: [
      {
        path: string;
        component: string;
        priority: number;
      }
    ]
  }
}

// Plugin Route Customizations collection
{
  pluginId: string;
  routes: {
    [originalPath: string]: string; // Maps original paths to custom paths
  }
}
```

### 2. Route Registry Update Flow

1. **Plugin Activation/Deactivation**: Whenever a plugin's active status changes
2. **Route Customization**: When admins change route paths
3. **Periodic Refresh**: A scheduled task that rebuilds the registry every few minutes
4. **Webhook Trigger**: A webhook that plugin zones can call to refresh their local cache

```typescript
// server/services/registry-updater.ts
export async function updateRegistry() {
  try {
    // 1. Rebuild the route registry
    const conflicts = await rebuildRouteRegistry()

    // 2. Notify the plugin router zone to refresh its cache
    await notifyPluginRouterZone()

    // 3. Log conflicts for monitoring
    if (conflicts.length > 0) {
      console.warn(`Found ${conflicts.length} route conflicts:`, conflicts)
    }

    return true
  } catch (error) {
    console.error('Failed to update registry:', error)
    return false
  }
}

async function notifyPluginRouterZone() {
  // Call a webhook endpoint that clears the route cache
  const response = await fetch(`${process.env.PLUGIN_ROUTER_URL}/api/refresh-routes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.PLUGIN_ROUTER_SECRET}`,
    },
    body: JSON.stringify({
      source: 'registry-updater',
      timestamp: Date.now(),
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to notify plugin router: ${response.statusText}`)
  }

  return true
}
```

## Performance Considerations

### 1. Trie-Based Route Resolution

Using a trie data structure for route matching has these benefits:

- **O(k) Lookup Time**: Where k is the number of segments in the URL path
- **Efficient Memory Usage**: Shared prefixes only stored once
- **Superior to Linear Search**: Much faster than iterating through all routes

### 2. Multi-Layer Caching Strategy

Implement a multi-layered caching approach:

```typescript
// Cache configuration
const MEMORY_CACHE_TTL = 60 * 1000 // 1 minute
const REDIS_CACHE_TTL = 60 * 60 * 1000 // 1 hour

// Memory cache (within the Node.js process)
const routeMemoryCache = {
  data: null,
  lastUpdated: 0,
}

// Redis or distributed cache client
const cacheClient = createCacheClient()

export async function getRouteRegistry() {
  const now = Date.now()

  // Check memory cache first (fastest)
  if (routeMemoryCache.data && now - routeMemoryCache.lastUpdated < MEMORY_CACHE_TTL) {
    return routeMemoryCache.data
  }

  // Then check Redis/distributed cache
  try {
    const cachedData = await cacheClient.get('plugin-route-registry')

    if (cachedData) {
      // Update memory cache
      routeMemoryCache.data = JSON.parse(cachedData)
      routeMemoryCache.lastUpdated = now

      return routeMemoryCache.data
    }
  } catch (error) {
    console.error('Cache read error:', error)
    // Continue to database lookup on cache error
  }

  // Finally, rebuild from database (slowest)
  const registry = new RouteRegistry()
  await registry.build()

  // Update both caches
  const registryData = {
    routes: registry.getRoutes(),
    conflicts: registry.getConflicts(),
  }

  routeMemoryCache.data = registryData
  routeMemoryCache.lastUpdated = now

  try {
    await cacheClient.set(
      'plugin-route-registry',
      JSON.stringify(registryData),
      'PX',
      REDIS_CACHE_TTL,
    )
  } catch (error) {
    console.error('Cache write error:', error)
  }

  return registryData
}
```

### 3. Route Invalidation Strategy

Implement targeted cache invalidation:

```typescript
export async function invalidateRouteCache(pluginId = null) {
  // Clear memory cache
  routeMemoryCache.data = null
  routeMemoryCache.lastUpdated = 0

  // Clear distributed cache
  try {
    // If plugin ID provided, only invalidate that plugin's routes
    if (pluginId) {
      const cacheKey = `plugin-routes:${pluginId}`
      await cacheClient.del(cacheKey)
    } else {
      // Otherwise invalidate all route caches
      await cacheClient.del('plugin-route-registry')
    }

    // Notify plugin router zone
    await fetch(`${process.env.PLUGIN_ROUTER_URL}/api/invalidate-cache`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PLUGIN_ROUTER_SECRET}`,
      },
      body: JSON.stringify({
        pluginId,
        timestamp: Date.now(),
      }),
    })

    return true
  } catch (error) {
    console.error('Cache invalidation error:', error)
    return false
  }
}
```

### 4. Incremental Route Updates

Instead of rebuilding the entire registry, support incremental updates:

```typescript
export async function updatePluginRoutes(pluginId, newRoutes) {
  const registry = getRouteRegistry()

  // Selectively update just this plugin's routes
  await registry.updatePluginRoutes(pluginId, newRoutes)

  // Only invalidate this plugin's cache
  await invalidateRouteCache(pluginId)

  return registry.getConflicts()
}
```

## Conclusion

By implementing a WordPress-like route management system with:

1. Pre-installation route validation
2. Visual conflict resolution
3. Live route customization
4. Trie-based efficient route resolution
5. Multi-layered caching

We create a robust solution for handling plugin route conflicts in a dynamic Payload CMS system. This approach provides the flexibility WordPress offers for route customization while maintaining performance through optimized data structures and caching strategies.

This system effectively balances the needs of:

- Plugin developers who need predictable routing
- Site administrators who need control without coding
- End users who expect fast, consistent experiences

The combination of visual tooling, efficient data structures, and careful caching creates a system where route conflicts are detected early, easily resolved, and efficiently processed at runtime.
