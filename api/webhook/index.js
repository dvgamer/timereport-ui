const { Router } = require('express')
const router = Router()

router.get('/monitor/check-hour/:hour', require('./monitor/check-hour'))

// Export the server middleware
module.exports = {
  path: '/webhook',
  handler: router
}
