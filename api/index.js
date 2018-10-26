const app = require('express')()
const consola = require('consola')
const http = require('http').Server(app)
const io = require('socket.io')(http)

const sql = require('mssql')
const prod = require('./config-prod.js')

// Require API routes
const inboundTransder = require('./inbound-transfer')
const query = require('./inbound-transfer/query')

// Import API Routes
app.use(inboundTransder)

// sql.close()
http.listen(5000, () => {

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
  path: '/api',
  handler: app
}
