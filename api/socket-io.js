const app = require('express')()
const consola = require('consola')
const http = require('http').Server(app)
const io = require('socket.io')(http)

const sql = require('mssql')
const prod = require('./config-prod.js')

let router = {}
if (process.env.NODE_ENV !== 'production') {
  const { Router } = require('express')
  router = Router()
} else {
  const app = require('express')()
  router = app
}


// Require API routes
const query = require('./inbound-transfer/query')
const port = process.env.SOCKET_PORT || 3010
// sql.close()
http.listen(port, () => {

  io.on('connection', socket => {
    consola.info('socket.io user connected')
    socket.on('disconnect', () => {
      consola.info('socket.io user disconnected')
    })
  })

  // setInterval(() => {
  //   io.emit('inbound-realtime-graph', [])
  //   io.emit('inbound-realtime-queue', [])
  //   io.emit('inbound-realtime-status', { wait: 0, fail: 0, complete: 0 })
  // }, 1000)

  let poolMain = async () => {
    let pool = await sql.connect(prod)
  
    let taskGraph = async () => {
      let results = await pool.request().query(query.graph)
      io.emit('inbound-realtime-graph', results['recordsets'][0])
      setTimeout(taskGraph, 1000)
    }
  
    let taskQueue = async () => {
      let results = await pool.request().query(query.queue)
      io.emit('inbound-realtime-queue', results['recordsets'][0])
      setTimeout(taskQueue, 500)
    }
  
    let taskStatus = async () => {
      let results = await pool.request().query(query.status)
      io.emit('inbound-realtime-status', {
        wait: results['recordset'][0].nTotal,
        fail: results['recordset'][1].nTotal,
        complete: results['recordset'][2].nTotal
      })
      setTimeout(taskStatus, 1000)
    }
    taskGraph()
    taskQueue()
    taskStatus()
  }
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
