const app = require('express')()
const port = process.env.PORT || 3001
const host = process.env.HOST || 'localhost'

let config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

if (config.dev) {
  const bodyParser = require('body-parser')
  // support parsing of application/json type post data
  app.use(bodyParser.json())

  //support parsing of application/x-www-form-urlencoded post data
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use((req, res, next) => {
    const methodAllow = [ 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'DELETE' ]
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Methods', methodAllow.join(','))
    if (req.method === 'OPTIONS') return res.sendStatus(200)
    next()
  })

  const api = require('./router')
  const auth = require('./authication')
  const log = require('./log-services')

  app.use(auth.path, auth.handler)
  app.use(api.path, api.handler)
  app.use(log.path, log.handler)

  require('./socket-io')
}
// Build only in dev mode
const { Nuxt } = require('nuxt')
const logger = require('@debuger')('NUXT')
const InitializeExpress = async () => {
  if (!config.dev) {
    // Init Nuxt.js
    const nuxt = new Nuxt(config)
    await nuxt.ready()
    app.use(nuxt.render)
  }
  await app.listen(port)
  logger.start(`Server initialize complated on http://${host}:${port}`)
}
InitializeExpress()
