const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const mongo = require('@mongo')

// Require API routes
const logger = require('@debuger')('HTTP')
const host = process.env.SOCKET_HOST || '0.0.0.0'
const port = process.env.SOCKET_PORT || 25091
// sql.close()
if (process.env.NODE_ENV === 'production') {
  http.listen(port, host, () => (async () => {
    logger.start(`Socket.io created listening on http://${host}:${port}`)
    let { PageSync, User } = await mongo.open()

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
}
