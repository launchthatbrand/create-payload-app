# Using Next.js Multi-Zones with PayloadCMS

This document explains how to implement a modular application architecture using Next.js Multi-Zones with PayloadCMS, providing a practical alternative to Module Federation.

## Table of Contents

- [What are Next.js Multi-Zones?](#what-are-nextjs-multi-zones)
- [Architectural Overview](#architectural-overview)
- [Implementation Guide](#implementation-guide)
- [Advanced Configurations](#advanced-configurations)
- [Deployment Strategies](#deployment-strategies)
- [Limitations and Considerations](#limitations-and-considerations)
- [Real-World Examples](#real-world-examples)
- [Dynamic Plugin System with Route Takeover](#dynamic-plugin-system-with-route-takeover)

## What are Next.js Multi-Zones?

Next.js Multi-Zones allow you to serve multiple independent Next.js applications under a single domain. Each application (or "zone") can be developed, deployed, and scaled independently while appearing to users as a single cohesive application.

### Key Benefits

1. **Independent Development**: Teams can work on different zones without affecting each other
2. **Independent Deployment**: Zones can be updated and deployed separately
3. **Specialized Optimization**: Each zone can be optimized for its specific use case
4. **Gradual Migration**: Legacy applications can be migrated zone-by-zone
5. **Shared Domain**: Users experience a single unified application

## Architectural Overview

A typical Multi-Zone architecture with PayloadCMS might include:

1. **Admin Zone**: PayloadCMS admin panel, served at `/admin`
2. **API Zone**: PayloadCMS API endpoints, served at `/api`
3. **Frontend Zone**: Public-facing website or application
4. **Additional Feature Zones**: E-commerce, blog, or other specialized functionality

### Example Architecture

```
example.com/                 → Frontend Zone
example.com/admin/*         → Admin Zone (PayloadCMS Admin Panel)
example.com/api/*           → API Zone (PayloadCMS API)
example.com/shop/*          → E-commerce Zone
example.com/blog/*          → Blog Zone
```

Each zone is a standalone Next.js application that can be developed and deployed independently.

## Implementation Guide

### 1. Setting Up the Base Projects

First, create separate Next.js applications for each zone:

```bash
# Create the frontend zone
npx create-next-app frontend-zone
# Create the admin zone
npx create-next-app admin-zone
# Create the API zone
npx create-next-app api-zone
```

### 2. Configuring PayloadCMS

For the admin and API zones, you'll need to set up PayloadCMS:

```bash
# Install PayloadCMS in the admin and API zones
cd admin-zone
npm install payload

cd ../api-zone
npm install payload
```

#### Admin Zone Configuration

```typescript
// admin-zone/payload.config.ts
import { buildConfig } from 'payload'
import path from 'path'

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: 'users',
    // Enable the default admin panel
    webpack: (config) => config,
  },
  collections: [
    // Your collections
  ],
  globals: [
    // Your globals
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})
```

#### API Zone Configuration

```typescript
// api-zone/payload.config.ts
import { buildConfig } from 'payload'
import path from 'path'

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001',
  admin: {
    // Disable the admin panel in the API zone
    disable: true,
  },
  collections: [
    // Your collections (same as admin zone)
  ],
  globals: [
    // Your globals (same as admin zone)
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})
```

### 3. Setting Up Next.js API Routes for PayloadCMS

#### Admin Zone

```typescript
// admin-zone/pages/api/[...payload].ts
import { nextHandler } from 'payload/next'
import { config } from '../../payload.config'

// Export middleware to handle all admin routes
export default nextHandler({
  config,
  path: '/api',
})
```

#### API Zone

```typescript
// api-zone/pages/api/[...payload].ts
import { nextHandler } from 'payload/next'
import { config } from '../../payload.config'

// Export middleware to handle all API routes
export default nextHandler({
  config,
  path: '/api',
})
```

### 4. Configuring Rewrites in the Main Zone

In your main frontend zone, configure rewrites to route requests to the appropriate zones:

```javascript
// frontend-zone/next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: `${process.env.ADMIN_URL}/admin/:path*`,
      },
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL}/api/:path*`,
      },
      // Add additional zones as needed
      {
        source: '/shop/:path*',
        destination: `${process.env.SHOP_URL}/shop/:path*`,
      },
      {
        source: '/blog/:path*',
        destination: `${process.env.BLOG_URL}/blog/:path*`,
      },
    ]
  },
}
```

### 5. Cross-Zone Authentication

For a seamless user experience, you'll need to share authentication between zones:

```typescript
// shared/auth.ts
import { getCookie, setCookie } from 'cookies-next'

export const getAuthToken = () => {
  return getCookie('payload-token')
}

export const setAuthToken = (token: string) => {
  // Set the token with a domain that applies to all zones
  setCookie('payload-token', token, {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
    domain: process.env.COOKIE_DOMAIN || 'localhost',
  })
}

export const clearAuthToken = () => {
  setCookie('payload-token', '', {
    maxAge: 0,
    path: '/',
    domain: process.env.COOKIE_DOMAIN || 'localhost',
  })
}
```

### 6. Cross-Zone Navigation

Use regular `<a>` tags instead of Next.js `<Link>` components when linking between zones:

```tsx
// Example of cross-zone navigation
const Navigation = () => {
  return (
    <nav>
      <a href="/">Home</a>
      <a href="/admin">Admin Panel</a>
      <a href="/blog">Blog</a>
      <a href="/shop">Shop</a>
    </nav>
  )
}
```

## Advanced Configurations

### 1. Shared Data Fetching

Implement shared data fetching utilities to be used across zones:

```typescript
// shared/api.ts
import { getAuthToken } from './auth'

export async function fetchFromPayload(path: string, options: RequestInit = {}) {
  const token = getAuthToken()

  const headers = {
    ...(options.headers || {}),
    'Content-Type': 'application/json',
  }

  if (token) {
    headers['Authorization'] = `JWT ${token}`
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`)
  }

  return response.json()
}
```

### 2. Shared Components and Styles

Create a shared component library or design system:

```bash
# Create a shared package
mkdir -p packages/ui
cd packages/ui
npm init -y
npm install react react-dom styled-components
```

```typescript
// packages/ui/components/Button.tsx
import styled from 'styled-components'

export const Button = styled.button`
  background: #0070f3;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #0051a2;
  }
`
```

### 3. Server Actions with Multi-Zones

When using Server Actions, configure allowed origins:

```javascript
// admin-zone/next.config.js
module.exports = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        'example.com',
        'www.example.com',
        'localhost:3000',
        // Add all domains that will call server actions
      ],
    },
  },
}
```

## Deployment Strategies

### 1. Vercel Deployment

Vercel provides native support for Next.js Multi-Zones:

```bash
# Deploy each zone to Vercel
vercel frontend-zone
vercel admin-zone --env NEXT_PUBLIC_API_URL=https://api.example.com
vercel api-zone
```

Configure custom domains and environment variables in the Vercel dashboard.

### 2. Self-Hosted Deployment

For self-hosted deployments, use a reverse proxy like Nginx:

```nginx
# /etc/nginx/sites-available/example.com
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://frontend:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /admin {
        proxy_pass http://admin:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api {
        proxy_pass http://api:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Additional zones
    location /shop {
        proxy_pass http://shop:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 3. Docker Compose Setup

```yaml
# docker-compose.yml
version: '3'

services:
  mongodb:
    image: mongo:latest
    volumes:
      - mongo-data:/data/db
    networks:
      - backend

  frontend:
    build: ./frontend-zone
    environment:
      - ADMIN_URL=http://admin:3000
      - API_URL=http://api:3000
      - SHOP_URL=http://shop:3000
    ports:
      - '3000:3000'
    networks:
      - frontend
      - backend

  admin:
    build: ./admin-zone
    environment:
      - DATABASE_URI=mongodb://mongodb:27017/payload
      - PAYLOAD_SECRET=your-secret-here
    depends_on:
      - mongodb
    networks:
      - backend

  api:
    build: ./api-zone
    environment:
      - DATABASE_URI=mongodb://mongodb:27017/payload
      - PAYLOAD_SECRET=your-secret-here
    depends_on:
      - mongodb
    networks:
      - backend

networks:
  frontend:
  backend:

volumes:
  mongo-data:
```

## Limitations and Considerations

### 1. Performance Considerations

- **Additional Network Hops**: Requests to non-primary zones require an additional network hop through the main zone
- **Cold Starts**: Each zone may experience cold starts independently
- **Shared Resources**: Database connections and other resources are not shared between zones

### 2. Development Experience

- **Multiple Repositories or Monorepo**: Choose between separate repositories or a monorepo approach
- **Local Development**: Running multiple zones locally requires careful port configuration
- **Shared Code**: Consider using a package manager like npm/yarn workspaces or pnpm for shared code

### 3. Database Management

- **Single Database**: All zones typically connect to the same database
- **Schema Synchronization**: Ensure all zones have the same collection definitions
- **Migrations**: Database migrations must be coordinated across zones

## Real-World Examples

### 1. E-commerce Site with Blog

```
example.com/              → Main site (product listings, etc.)
example.com/admin/        → PayloadCMS admin panel
example.com/api/          → PayloadCMS API
example.com/blog/         → Blog powered by PayloadCMS content
example.com/checkout/     → Checkout experience (separate zone)
```

### 2. Media Site with User Portal

```
example.com/              → Public content (articles, videos)
example.com/admin/        → PayloadCMS admin panel
example.com/api/          → PayloadCMS API
example.com/user/         → User portal (account management, subscriptions)
example.com/live/         → Live events streaming (specialized zone)
```

### 3. Educational Platform

```
example.com/              → Marketing site
example.com/admin/        → PayloadCMS admin panel
example.com/api/          → PayloadCMS API
example.com/courses/      → Course catalog and delivery
example.com/community/    → Community forums and discussions
```

## Conclusion

Next.js Multi-Zones provide a powerful alternative to Module Federation for building modular applications with PayloadCMS. By breaking your application into independent zones, you can achieve better separation of concerns, independent deployment, and specialized optimization while maintaining a unified user experience.

This approach is particularly well-suited for large applications with distinct functional areas, teams working on different parts of the application, or when gradually migrating from legacy systems.

While Multi-Zones introduce some complexity in routing and deployment, the benefits of modularity and independent development often outweigh these challenges, especially when building complex applications with PayloadCMS.

## Dynamic Plugin System with Route Takeover

This section explores how to build a WordPress-like plugin system using Multi-Zones, where plugins can not only update collections, database, API, and GraphQL, but also automatically take control of undefined frontend routes.

### The Challenge

Traditional Next.js applications define their routes at build time through the file system. This presents a challenge for plugin systems that need to dynamically inject routes at runtime. We need a solution that allows:

1. Plugins to register new routes without requiring the host application to rebuild
2. A fallback mechanism that routes undefined paths to plugin-controlled components
3. The ability for plugins to inject entire page components and layouts
4. A way for the host application to maintain control over priority routes

### Architecture: Plugin Router Zone

The key to implementing this system is creating a dedicated "Plugin Router Zone" that:

1. Acts as a fallback for all undefined routes
2. Has access to a plugin registry
3. Can dynamically render plugin-provided components
4. Communicates with the plugin API to determine route handling

#### High-Level Overview

```
example.com/                → Main Application Zone (user-controlled)
example.com/admin/         → PayloadCMS Admin Zone
example.com/api/           → PayloadCMS API Zone
example.com/<undefined>/*  → Plugin Router Zone (catches all undefined routes)
```

### Implementation Strategy

#### 1. Creating the Plugin Router Zone

```bash
# Create a dedicated zone for plugin-controlled routes
npx create-next-app plugin-router-zone
```

The Plugin Router Zone is a special Next.js application that:

1. Serves as a catch-all for undefined routes
2. Has a connection to the plugin registry
3. Dynamically renders components based on the requested path

```typescript
// plugin-router-zone/pages/[[...path]].tsx
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { fetchActivePlugins, fetchRouteHandler } from '../lib/plugin-api'

export default function DynamicPluginRoute() {
  const router = useRouter()
  const { path } = router.query
  const currentPath = Array.isArray(path) ? `/${path.join('/')}` : '/'

  const [Component, setComponent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadComponent() {
      try {
        // Determine which plugin handles this route
        const routeHandler = await fetchRouteHandler(currentPath)

        if (routeHandler) {
          // Dynamically import the component from the plugin
          const DynamicComponent = dynamic(() =>
            import(`@plugins/${routeHandler.plugin}/components/${routeHandler.component}`)
          )
          setComponent(() => DynamicComponent)
        } else {
          setError('No plugin found to handle this route')
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadComponent()
  }, [currentPath])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!Component) return <div>No component found for this route</div>

  return <Component path={currentPath} />
}
```

#### 2. Plugin Registration and Route Mapping

Create a system where plugins can register their routes and components:

```typescript
// shared/plugin-types.ts
export interface PluginRoute {
  path: string
  component: string
  exact?: boolean
  priority?: number
}

export interface Plugin {
  id: string
  name: string
  version: string
  routes: PluginRoute[]
  collections: any[]
  // Other plugin metadata
}
```

```typescript
// plugin-router-zone/lib/plugin-api.ts
import { Plugin, PluginRoute } from '../../shared/plugin-types'

// This would connect to your PayloadCMS API or a dedicated plugin registry
export async function fetchActivePlugins(): Promise<Plugin[]> {
  const response = await fetch(`${process.env.API_URL}/api/plugins?active=true`)
  return response.json()
}

export async function fetchRouteHandler(path: string): Promise<{
  plugin: string
  component: string
} | null> {
  const plugins = await fetchActivePlugins()

  // Find all matching routes across all plugins
  const matchingRoutes = plugins.flatMap((plugin) =>
    plugin.routes
      .filter((route) => {
        // Exact match
        if (route.exact && route.path === path) return true

        // Path pattern matching (simplified)
        if (!route.exact && path.startsWith(route.path)) return true

        return false
      })
      .map((route) => ({
        plugin: plugin.id,
        component: route.component,
        priority: route.priority || 0,
        path: route.path,
      })),
  )

  // Sort by priority and specificity
  matchingRoutes.sort((a, b) => {
    // Higher priority wins
    if (a.priority !== b.priority) return b.priority - a.priority

    // More specific path wins
    return b.path.length - a.path.length
  })

  return matchingRoutes[0] || null
}
```

#### 3. Plugin Component Loading System

Create a system to load plugin components:

```typescript
// plugin-router-zone/lib/component-loader.ts
// This is a simplified example. In practice, you'd need a more sophisticated system
// to dynamically load components from plugins

const componentRegistry = {
  // Maps plugin components to actual component modules
  'courses-plugin': {
    CourseList: () => import('../components/plugin-components/courses/CourseList'),
    CourseDetail: () => import('../components/plugin-components/courses/CourseDetail'),
    LessonList: () => import('../components/plugin-components/courses/LessonList'),
    LessonDetail: () => import('../components/plugin-components/courses/LessonDetail'),
  },
  // Other plugins...
}

export function loadComponent(pluginId: string, componentName: string) {
  if (!componentRegistry[pluginId] || !componentRegistry[pluginId][componentName]) {
    throw new Error(`Component ${componentName} not found in plugin ${pluginId}`)
  }

  return componentRegistry[pluginId][componentName]()
}
```

### 4. Main Zone Configuration

Configure the main application zone to forward undefined routes to the plugin router:

```javascript
// frontend-zone/next.config.js
module.exports = {
  async rewrites() {
    return [
      // Defined routes first
      {
        source: '/admin/:path*',
        destination: `${process.env.ADMIN_URL}/admin/:path*`,
      },
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL}/api/:path*`,
      },

      // Plugin-specific routes you want to explicitly define
      {
        source: '/courses',
        destination: `${process.env.PLUGIN_ROUTER_URL}/courses`,
      },
      {
        source: '/lessons',
        destination: `${process.env.PLUGIN_ROUTER_URL}/lessons`,
      },

      // Catch-all for undefined routes - must be last!
      {
        source: '/:path*',
        destination: `${process.env.PLUGIN_ROUTER_URL}/:path*`,
        // This has a condition to skip routes that are defined in the main app
        has: [
          {
            type: 'header',
            key: 'x-nextjs-data',
            value: '1',
          },
        ],
        missing: [
          {
            type: 'header',
            key: 'x-handle-by-main-app',
            value: '1',
          },
        ],
      },
    ]
  },
}
```

### Real-World Example: Course and Lesson Management Plugin

Let's implement a course management plugin that automatically adds `/courses` and `/lessons` routes:

1. **Plugin Definition**:

```typescript
// In your plugin registry
const coursePlugin = {
  id: 'courses-plugin',
  name: 'Course Management',
  version: '1.0.0',
  routes: [
    {
      path: '/courses',
      component: 'CourseList',
      exact: true,
      priority: 10,
    },
    {
      path: '/courses/',
      component: 'CourseDetail',
      exact: false,
      priority: 5,
    },
    {
      path: '/lessons',
      component: 'LessonList',
      exact: true,
      priority: 10,
    },
    {
      path: '/lessons/',
      component: 'LessonDetail',
      exact: false,
      priority: 5,
    },
  ],
  collections: [
    // Course and lesson collections for PayloadCMS
  ],
}
```

2. **Course List Component**:

```tsx
// plugin-router-zone/components/plugin-components/courses/CourseList.tsx
import React, { useEffect, useState } from 'react'
import { fetchFromPayload } from '../../../shared/api'

export default function CourseList() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCourses() {
      try {
        const { docs } = await fetchFromPayload('/api/courses')
        setCourses(docs)
      } catch (error) {
        console.error('Failed to load courses:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCourses()
  }, [])

  if (loading) return <div>Loading courses...</div>

  return (
    <div className="courses-container">
      <h1>All Courses</h1>
      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <a href={`/courses/${course.slug}`} className="course-link">
              View Course
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
```

3. **Lesson List Component**:

```tsx
// plugin-router-zone/components/plugin-components/courses/LessonList.tsx
import React, { useEffect, useState } from 'react'
import { fetchFromPayload } from '../../../shared/api'

export default function LessonList() {
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadLessons() {
      try {
        const { docs } = await fetchFromPayload('/api/lessons')
        setLessons(docs)
      } catch (error) {
        console.error('Failed to load lessons:', error)
      } finally {
        setLoading(false)
      }
    }

    loadLessons()
  }, [])

  if (loading) return <div>Loading lessons...</div>

  return (
    <div className="lessons-container">
      <h1>All Lessons</h1>
      <div className="lessons-list">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="lesson-item">
            <h2>{lesson.title}</h2>
            <p>{lesson.description}</p>
            <div>Course: {lesson.course.title}</div>
            <a href={`/lessons/${lesson.slug}`} className="lesson-link">
              View Lesson
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Advanced: Middleware-Based Route Resolution

For more control, you can use Next.js middleware in your main application to determine whether to handle a route locally or forward it to the plugin router:

```typescript
// frontend-zone/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { fetchRouteMapping } from './lib/plugin-api-client'

// Cache route mapping to avoid API calls on every request
let routeCache = null
let lastCacheUpdate = 0
const CACHE_TTL = 60 * 1000 // 1 minute

async function getRouteMapping() {
  const now = Date.now()
  if (!routeCache || now - lastCacheUpdate > CACHE_TTL) {
    routeCache = await fetchRouteMapping()
    lastCacheUpdate = now
  }
  return routeCache
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip for static files, API routes, etc.
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/admin/')
  ) {
    return NextResponse.next()
  }

  // Check if this is a defined route in the main app
  // This would check the local file system routes
  const isLocalRoute = checkIfLocalRoute(pathname)
  if (isLocalRoute) {
    // Let the main app handle it
    const response = NextResponse.next()
    response.headers.set('x-handle-by-main-app', '1')
    return response
  }

  // Check the plugin route mapping
  const routeMapping = await getRouteMapping()
  const pluginRoute = routeMapping[pathname]

  if (pluginRoute) {
    // Forward to the plugin router
    const url = new URL(`${process.env.PLUGIN_ROUTER_URL}${pathname}`, request.url)
    return NextResponse.rewrite(url)
  }

  // No handler found, let the main app's 404 handle it
  return NextResponse.next()
}

function checkIfLocalRoute(pathname: string) {
  // In a real app, this would check the routes defined in the main app
  // Simplified example:
  const localRoutes = ['/', '/about', '/contact', '/blog']
  return localRoutes.includes(pathname)
}
```

### Plugin System Benefits

This approach offers several powerful benefits:

1. **WordPress-like Plugin Experience**: Plugins can truly extend the application with new frontend routes automatically
2. **Zero-Config for End Users**: Users don't have to create routes manually for plugin functionality
3. **Dynamic Updates**: New routes can be added without rebuilding the application
4. **Frontend Control**: Plugins can provide complete UI components, not just data
5. **Progressive Enhancement**: The main app retains control over priority routes
6. **Fallback Mechanism**: Undefined routes are automatically handled by plugins

### Limitations and Considerations

1. **Performance Overhead**: Each request to an undefined route requires plugin registry lookups
2. **Code Splitting Challenges**: Managing code splitting across plugin components requires careful design
3. **SEO Considerations**: Dynamically generated routes may need additional SEO optimization
4. **Security**: Plugin code execution should be carefully sandboxed and validated
5. **Development Experience**: Debugging across multiple zones and plugin components can be complex

### Conclusion: Building a WordPress-like Plugin Ecosystem

The combination of Next.js Multi-Zones with a dynamic plugin router creates a powerful foundation for a WordPress-like ecosystem where plugins can:

1. Extend the database schema through PayloadCMS collections
2. Add new API endpoints automatically
3. Register GraphQL types and queries
4. Take control of undefined frontend routes to render custom UI

This approach enables true "plug and play" functionality where users can install a plugin and immediately get not just backend functionality, but also complete frontend pages without manual configuration.

While this implementation is more complex than standard Multi-Zones, it offers unprecedented extensibility for PayloadCMS applications, allowing you to build a true competitor to traditional CMS platforms like WordPress while maintaining the modern architecture and developer experience of Next.js.
