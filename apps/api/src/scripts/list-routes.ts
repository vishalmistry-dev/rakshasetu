import express from 'express'

interface Route {
  method: string
  path: string
}

function getRoutes(app: express.Application): Route[] {
  const routes: Route[] = []

  function extractRoutes(stack: any[], basePath = '') {
    stack.forEach((middleware) => {
      if (middleware.route) {
        // Regular route
        const methods = Object.keys(middleware.route.methods)
        methods.forEach((method) => {
          routes.push({
            method: method.toUpperCase(),
            path: basePath + middleware.route.path,
          })
        })
      } else if (middleware.name === 'router' && middleware.handle.stack) {
        // Nested router
        const path = middleware.regexp
          .toString()
          .replace('/^', '')
          .replace('\\/?(?=\\/|$)/i', '')
          .replace(/\\\//g, '/')
          .replace(/\(\?:\(\[\^\\\/]\+\?\)\)/g, ':param')

        extractRoutes(middleware.handle.stack, basePath + path)
      }
    })
  }

  extractRoutes(app._router.stack)
  return routes
}

export function listRoutes(app: express.Application) {
  const routes = getRoutes(app)

  // Group by path prefix
  const grouped: { [key: string]: Route[] } = {}

  routes.forEach((route) => {
    const prefix = route.path.split('/')[1] || 'root'
    if (!grouped[prefix]) {
      grouped[prefix] = []
    }
    grouped[prefix].push(route)
  })

  console.log('\n📋 API Routes:\n')
  console.log('='.repeat(80))

  Object.keys(grouped)
    .sort()
    .forEach((prefix) => {
      console.log(`\n🔹 /${prefix}`)
      console.log('-'.repeat(80))

      grouped[prefix]
        .sort((a, b) => a.path.localeCompare(b.path))
        .forEach((route) => {
          const method = route.method.padEnd(7)
          console.log(`  ${method} ${route.path}`)
        })
    })

  console.log('\n' + '='.repeat(80))
  console.log(`\n✅ Total Routes: ${routes.length}\n`)
}
