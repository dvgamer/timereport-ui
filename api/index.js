const app = require('express')()
const { Nuxt } = require('nuxt')
const api = require('./api.js')
const socket = require('./socket-io')
const dataSync = require('./data-sync')
const auth = require('./authication')
const logger = require('./debuger')('API')
const port = process.env.PORT || 3001
const host = process.env.HOST || 'localhost'

let config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

app.use((req, res, next) => {
  const methodAllow = [ 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT' ]
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', methodAllow.join(','))
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  next()
})

app.use(socket.path, socket.handler)
app.use(api.path, api.handler)
app.use(auth.path, auth.handler)

// Build only in dev mode
const InitializeExpress = async () => {
  if (!config.dev) {
    // Init Nuxt.js
    const nuxt = new Nuxt(config)
    await nuxt.ready()
    app.use(nuxt.render)
  }
  await app.listen(port)
  if (!config.dev) await dataSync()
  logger.start(`Server initialize complated on http://${host}:${port}`)
}
InitializeExpress()
