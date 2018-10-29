const chalk = require('chalk')
const api = require('./api')
const port = 3001

api.handler.listen(port, () => console.log(chalk.black.bgGreen('READY ') + ' ' + chalk.green(`Listening on http://localhost:${port}`)))
