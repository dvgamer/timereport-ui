const { Router } = require('express')
const data = require('./data')

let router = {}
router = Router()

// Require API routes
const logger = require('./debuger')('API')
const inspect = require('./inspect')
const appService = require('./app-service')

router.get('/init', (req, res) => {
  data().then(() => {
    res.status(200).end()
  }).catch(ex => {
    res.status(404)
    res.write(ex.message)
    res.send()
  })
})

router.get('/status', (req, res) => {
  res.status(200).end()
})
// Import API Routes
router.use('/app', appService)
router.use('/inspect', inspect)

if (process.env.NODE_ENV === 'production') {
  logger.start(`Server listening on ${process.env.AXIOS_BASE_URL}`)
}
// Export the server middleware
module.exports = {
  path: '/api',
  handler: router
}
