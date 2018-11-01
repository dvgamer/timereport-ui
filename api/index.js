const app = require('express')()
const http = require('http').Server(app)

let router = {}
if (process.env.NODE_ENV !== 'production') {
  const { Router } = require('express')
  router = Router()
} else {
  const app = require('express')()
  router = app
}

// Require API routes
const inspect = require('./inspect')
const inboundTransder = require('./inbound-transfer')

// Import API Routes
router.use('/inbound-transfer', inboundTransder)
router.use('/inspect', inspect)


// Export the server middleware
module.exports = {
  path: '/api',
  handler: router
}
