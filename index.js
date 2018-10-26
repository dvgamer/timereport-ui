const api = require('./api')
const port = 3001
api.handler.listen(port, () => console.log(` READY  Listening on http://localhost:${port}`))
