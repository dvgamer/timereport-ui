const app = require('express')()
const { Nuxt, Builder } = require('nuxt')
const consola = require('consola')
const api = require('./api.js')
const socket = require('./socket-io')
const auth = require('./authication')
const port = 3001
const host = 'localhost'

let config = require('./nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'
if (config.dev) {
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
}

// Build only in dev mode
if (!config.dev) {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)
  app.use(nuxt.render)
}


app.use(socket.path, socket.handler)
app.use(api.path, api.handler)
app.use(auth.path, auth.handler)

app.listen(port, () => consola.ready({ message: `Server listening on http://${host}:${port}`, badge: true }))
