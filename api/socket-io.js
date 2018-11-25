const app = require('express')()
const consola = require('consola')
const chalk = require('chalk')
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
const port = process.env.SOCKET_PORT || 3010
// sql.close()
http.listen(port, () => (async () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(chalk.black.bgGreen('READY ') + ' ' + chalk.green(`Socket.IO on http://localhost:${port}`))
  }

  io.on('connection', socket => {
    consola.info('socket.io user connected')
    socket.on('disconnect', () => {
      consola.info('socket.io user disconnected')
    })
  })
  let { PageSync, User } = await db.open()

  const changeUser = User.watch()
  changeUser.on('change', async (change) => {
    if (change.operationType !== 'update') return
    let { updatedFields } = change.updateDescription
    if (!updatedFields.activate && !updatedFields.enabled) return
    console.log('changeUser', updatedFields.activate, updatedFields.enabled)
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
  console.log('socket.io::', ex)
}))

// Export the server middleware
module.exports = {
  path: '/socket-io',
  handler: router
}
