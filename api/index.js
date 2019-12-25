const bodyParser = require('body-parser')
const { Nuxt, Builder } = require('nuxt')

const app = require('express')()
const logger = require('@touno-io/debuger')('Server')

const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

// Build only in dev mode
const InitializeExpress = async () => {
  const nuxt = new Nuxt(config)
  if (!config.dev) {
    await nuxt.ready()
  } else {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  app.use(nuxt.render)

  app.listen(config.server.port)
  logger.start(`Server initialize on http://${config.server.host}:${config.server.port}`)
}

// support parsing of application/json type post data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  if (config.dev) {
    const methodAllow = ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'DELETE']
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Methods', methodAllow.join(','))
  }
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  next()
})

if (config.dev) {
  // const api = require('./router')
  // const auth = require('./authication')
  // const log = require('./log-services')

  // app.use(auth.path, auth.handler)
  // app.use(api.path, api.handler)
  // app.use(log.path, log.handler)

  // require('./socket-io')
}

InitializeExpress().catch(ex => {
  console.log(ex)
})
