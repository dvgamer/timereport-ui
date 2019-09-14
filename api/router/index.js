const { Router } = require('express')

let router = Router()

// Require API routes
const logger = require('@debuger')('API')
const data = require('./init-data')
// const inspect = require('./inspect')
const appService = require('./app-service')

router.get('/initialize', (req, res) => {
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
router.use('/employee', require('./employee'))
router.use('/survey', require('./survey'))
router.use('/config', require('./config'))
router.use('/monitor', require('./monitor'))
router.use('/audit', require('./audit'))

// router.use('/inspect', inspect)

if (process.env.NODE_ENV === 'production') {
  logger.start(`API server created.`)
}
// Export the server middleware
module.exports = {
  path: '/api',
  handler: router
}
