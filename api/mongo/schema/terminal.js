module.exports = [
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
