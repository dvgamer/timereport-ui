const app = require('express')()
const consola = require('consola')
const chalk = require('chalk')
const http = require('http').Server(app)
const io = require('socket.io')(http)

const sql = require('mssql')
const prod = require('./config-prod.js')
const dataSync = require('./data-sync')

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
http.listen(port, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(chalk.black.bgGreen('READY ') + ' ' + chalk.green(`Socket.IO on http://localhost:${port}`))
  }
  io.on('connection', socket => {
    consola.info('socket.io user connected')
    socket.on('disconnect', () => {
      consola.info('socket.io user disconnected')
    })
  })

  console.log('data-sync loading.')
  dataSync().then(() => {
    console.log('data-sync completed.')
  }).catch(ex => {
    console.log(ex)
  })
  // operationType: 'insert',
  // // fullDocument:

  // db.open().then(({ User }) => {
  //   const changeStream = User.watch()
  //   changeStream.on('change', (change) => {
  //     console.log('COLLECTION CHANGED', change)
  //   })
  // }).catch(console.log)
  
  


  // setInterval(() => {
  //   io.emit('inbound-realtime-graph', [])
  //   io.emit('inbound-realtime-queue', [])
  //   io.emit('inbound-realtime-status', { wait: 0, fail: 0, complete: 0 })
  // }, 1000)
  // poolMain()
})

// let exitHandler = (options, err) => {
//   sql.close()
//   consola.error('Processing Stoped.')
//   if (options.exit) process.exit();
// }

// //catches ctrl+c event
// process.on('SIGINT', exitHandler.bind(null, { exit: true }))

// // catches "kill pid" (for example: nodemon restart)
// process.on('SIGUSR1', exitHandler.bind(null, { exit: true }))
// process.on('SIGUSR2', exitHandler.bind(null, { exit: true }))
// process.on('uncaughtException', exitHandler.bind(null, { exit: true }))

// Export the server middleware
module.exports = {
  path: '/socket-io',
  handler: router
}
