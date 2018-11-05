const app = require('express')()
const http = require('http').Server(app)
const data = require('./data')

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
const appService = require('./app-service')

router.use('*', (req, res, next) => {
  console.log(`API:: ${req.method} ${req.baseUrl}`)
  next()
})

router.get('/init', (req, res) => {
  data().then(() => {
    res.status(200).end()
  }).catch(ex => {
    res.status(404)
    res.write(ex.message)
    res.send()
  })
})
// Import API Routes
router.use('/app', appService)
router.use('/inspect', inspect)


// Export the server middleware
module.exports = {
  path: '/api',
  handler: router
}
