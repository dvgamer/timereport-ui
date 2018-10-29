const mongoose = require('mongoose')
const { Schema } = mongoose
const { Mixed } = Schema.Types
module.exports = [
  {
    id: 'Snippet',
    name: 'db-snippet',
    schema: Schema({
      title: String,
      file: String,
      task: String,
      user: String,
      avatar: String,
      private: Boolean,
      content: String,
      updated: Date,
      created: Date
    })
  },
  {
    id: 'TerminalLog',
    name: 'db-terminal-log',
    schema: Schema({
      user: String,
      stdin: String,
      exec: String,
      stdout: String,
      created: Date
    })
  },
  {
    id: 'TerminalCommand',
    name: 'db-terminal-command',
    schema: Schema({
      cmd: String,
      template: String,
      created: Date
    })
  }
]
