const app = require('express')()
const chalk = require('chalk')
const api = require('./api')
const socket = require('./api/socket-io')
const auth = require('./api/authication')
const port = 3001

if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    const methodAllow = [ 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT' ]
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Methods', methodAllow.join(','))
    if (req.method === 'OPTIONS') return res.sendStatus(200)
    next()
  })
}

app.use(socket.path, socket.handler)
app.use(api.path, api.handler)
app.use(auth.path, auth.handler)

app.listen(port, () => console.log(chalk.black.bgGreen('READY ') + ' ' + chalk.green(`Listening on http://localhost:${port}`)))
