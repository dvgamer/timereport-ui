
const mongo = require('@touno-io/db')()
const { Nuxt, Builder } = require('nuxt')
const app = require('express')()
const bodyParser = require('body-parser')
const decodeBearer = require('./authication/decode-bearer')

const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

// Sessions to create `req.session`
if (!process.env.JWT_KEYHASH) throw new Error('Environment `JWT_KEYHASH` is undefined.')

// Build only in dev mode
const InitializeExpress = async () => {
  const logger = require('@touno-io/debuger')('Init')
  logger.info('MongoDB Connectiing...')
  await mongo.open()
  mongo.set(require('./mongo/schema/user'))
  mongo.set(require('./mongo/schema/config'))
  mongo.set(require('./mongo/schema/terminal'))

  if (config.dev) {
    logger.info('MongoDB Database...')
    const menu = require('./.data/mainmenu')
    const { Config } = mongo.get()
    await Config.deleteMany(menu.segment)
    for (const value of menu.item) {
      await new Config(Object.assign(menu.segment, { value })).save()
    }
  }

  const server = require('@touno-io/debuger')('Server')
  const nuxt = new Nuxt(config)
  if (!config.dev) {
    await nuxt.ready()
  } else {
    server.info('NuxtJS Build...')
    const builder = new Builder(nuxt)
    await builder.build()
  }
  app.use(nuxt.render)

  app.listen(config.server.port)
  server.start(`Server initialize on http://${config.server.host}:${config.server.port}`)
}

// support parsing of application/json type post data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  // if (config.dev) {
  //   const methodAllow = ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'DELETE']
  //   res.setHeader('Content-Type', 'application/json')
  //   res.setHeader('Access-Control-Allow-Origin', '*')
  //   res.setHeader('Access-Control-Allow-Headers', '*')
  //   res.setHeader('Access-Control-Allow-Credentials', 'true')
  //   res.setHeader('Access-Control-Allow-Methods', methodAllow.join(','))
  // }
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  next()
})

app.use('/auth', require('./authication'))
app.use('/api', async (req, res, next) => {
  try {
    await mongo.open()
    const { UserSession } = mongo.get()
    const decode = decodeBearer(req.headers.authorization)
    if (!decode._id) throw new Error('Unknow decode bearer.')

    const session = await UserSession.findOne({ _id: decode._id, expired: { $gte: new Date() } })
    if (!session) throw new Error('Session user is expired.')
    next()
  } catch (ex) {
    res.status(401).json({ error: ex.message || ex })
  }
})
app.use('/api/main', require('./main'))

if (config.dev) {
  // const api = require('./router')
  // const auth = require('./authication')
  // const log = require('./log-services')

  // app.use(api.path, api.handler)
  // app.use(log.path, log.handler)

  // require('./socket-io')
}

InitializeExpress().catch(ex => {
  console.log(ex)
})
