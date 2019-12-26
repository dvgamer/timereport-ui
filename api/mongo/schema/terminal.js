const { Mixed } = require('@touno-io/db').type

module.exports = [
  {
    id: 'Config',
    name: 'db-config',
    schema: {
      segment: { type: String, index: true },
      field: { type: String, index: true },
      value: Mixed
    }
  },
  {
    id: 'TerminalCommand',
    name: 'db-terminal-command',
    schema: {
      cmd: String,
      template: String
    }
  },
  {
    id: 'TerminalLog',
    name: 'db-terminal-log',
    schema: {
      user: String,
      stdin: String,
      exec: String,
      stdout: String
    }
  }
]
