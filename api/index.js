const app = require('express')()

const http = require('http').Server(app)
const io = require('socket.io')(http)

// Require API routes
const inboundTransder = require('./inbound-transfer')

// Import API Routes
app.use(inboundTransder)

io.on('connection', socket => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('a user disconnected')
  })
})

http.listen(3001, () => {
  console.log('listening socket.io on *:3001')
})

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
