const app = require('express')()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001
const host = process.env.HOST || 'localhost'
const routerName = process.argv[2] || 'API'
let config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

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
const aHandler = [
  require('./router'),
  require('./authication'),
  require('./log-services')
]

// // Build only in dev mode
const logger = require('@debuger')(routerName)
const InitializeExpress = async () => {
  let router = ''
  for (const api of aHandler) {
    if (api.path === `/${routerName}`) {
      router = api.path
      app.use(api.path, api.handler)
      break
    }
  }

  await app.listen(port)
  logger.start(`Server initialize complated on http://${host}:${port}${router}`)
}
InitializeExpress()
