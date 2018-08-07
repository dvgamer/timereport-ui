const app = require('express')()

const http = require('http').Server(app)
const io = require('socket.io')(http)

// Require API routes
const users = require('./users')

// Import API Routes
app.use(users)

io.on('connection', socket => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('a user disconnected')
  })
})

http.listen(3002, function(){
  console.log('listening socket.io on *:3002');
})

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
