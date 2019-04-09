const chalk = require('chalk')
const moment = require('moment')
const isDev = process.env.NODE_ENV !== 'production'

const groupSize = 7
const scopeSize = 4
const groupPadding = (msg, size, pad) => {
  return msg.length > size ? msg.substr(0, size) : msg[pad](size, ' ')
}

const logWindows = (scope, icon, title, color, msg) => {
  let msg2 = [ chalk.gray(moment().format('HH:mm:ss.SSS')), color(icon) ]
  msg2.push(color(groupPadding(title, groupSize, 'padStart')))
  if (scope) {
    msg2.push(groupPadding(scope, scopeSize, 'padEnd'))
    msg2.push(chalk.cyan('»'))
  }
  console.log(...(msg2.concat(msg)))
}

const logLinux = (scope, icon, msg) => {
  let msg2 = [ moment().format('YYYY-MM-DD HH:mm:ss.SSS'), (!icon ? '…' : icon) ]
  if (scope) msg2.push(`[${scope.toUpperCase()}]`)
  console.log(...(msg2.concat(msg)))
}

module.exports = scopeName => {
  let measure = null
  return {
    log (...msg) {
      if (isDev) logWindows(scopeName, '…', 'debug', chalk.gray.bold, msg); else logLinux(scopeName, '…', msg)
    },
    start (...msg) {
      if (isDev) logWindows(scopeName, '○', 'start', chalk.cyan.bold, msg); else logLinux(scopeName, '○', msg)
    },
    success (...msg) {
      if (isDev) logWindows(scopeName, '●', 'success', chalk.green.bold, msg); else logLinux(scopeName, '●', msg)
    },
    warning (...msg) {
      if (isDev) logWindows(scopeName, '▲', 'warning', chalk.yellow.bold, msg); else logLinux(scopeName, '▲', msg)
    },
    info (...msg) {
      if (isDev) logWindows(scopeName, '╍', 'info', chalk.blue.bold, msg); else logLinux(scopeName, null, msg)
    },
    error (ex) {
      if (!ex) return
      if (ex instanceof Error) {
        let excep = /at.*?\((.*?)\)/i.exec(ex.stack) || []
        logLinux(scopeName, 'х', [ ex.message.indexOf('Error:') === 0 ? ex.message.replace('Error:', 'ERROR-Message:') : `ERROR-Message: ${ex.message}` ])
        logLinux(scopeName, 'х', [ `stack: ${excep[1] ? excep[1] : 'N/A'}`, ex.message ])
      } else {
        let msg = [ ex.toString() ]
        if (measure) msg.push(`(${measure.total()})`)
        if (isDev) logWindows(scopeName, 'х', 'error', chalk.red.bold, msg); else logLinux(scopeName, 'х', msg)
      }
    }
  }
}
