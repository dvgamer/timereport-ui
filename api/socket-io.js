const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const db = require('./mongodb')

let router = {}
if (process.env.NODE_ENV !== 'production') {
  const { Router } = require('express')
  router = Router()
} else {
  const app = require('express')()
  router = app
}

// Require API routes
const logger = require('./debuger')('HTTP')
const host = process.env.SOCKET_HOST || '0.0.0.0'
const port = process.env.SOCKET_PORT || 25082
// sql.close()
http.listen(port, host, () => (async () => {
  if (process.env.NODE_ENV !== 'production') {
    logger.start(`Socket.IO listening on http://${host}:${port}`)
    io.on('connection', socket => {
      socket.on('disconnect', () => { })
    })
  } else {
    debuger.start(`Socket.IO listening on http://${host}:${port}`)
  }
  let { PageSync, User } = await db.open()

  const changeUser = User.watch()
  changeUser.on('change', async (change) => {
    if (change.operationType !== 'update') return
    let { updatedFields } = change.updateDescription
    if (!updatedFields.activate && !updatedFields.enabled) return
    logger.log('changeUser', updatedFields.activate, updatedFields.enabled)
    let { activate, enabled, mail }  = await User.findOne({ _id: change.documentKey._id })
    io.emit(`sign-in|status`, { activate, enabled, mail })
  })

  const changePageSync = PageSync.watch()
  changePageSync.on('change', async (change) => {
    if (change.operationType !== 'update') return
    let { data, route, module  }  = await PageSync.findOne({ _id: change.documentKey._id })
    io.emit(`${route}|${module}`, data)
  })
})().catch(ex => {
  logger.error(ex)
}))

// Export the server middleware
module.exports = {
  path: '/socket-io',
  handler: router
}
