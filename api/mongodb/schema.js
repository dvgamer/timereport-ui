const mongoose = require('mongoose')
const { Schema } = mongoose
const { Mixed } = Schema.Types

module.exports = [
  {
    id: 'PageSync',
    name: 'db-page-sync',
    schema: Schema({
      route: String,
      module: String,
      query: String,
      crontab: String,
      data: Object,
      updated: Date,
      created: Date
    })
  },
  {
    id: 'User',
    name: 'db-user',
    schema: Schema({
      name: String,
      mail: String,
      title: String,
      company: String,
      department: String,
      office_name: String,
      description: String,
      display_name: String,
      telephone_no: String,
      user_name: String,
      user_type: String,
      basic: String,
      active: Boolean,
      token: String,
      lasted: Date,
      updated: Date,
      created: Date
    })
  },
  {
    id: 'UserHistory',
    name: 'db-user-history',
    schema: Schema({
      mail: String,
      basic: String,
      token: String,
      created: Date
    })
  },
  {
    id: 'Snippet',
    name: 'db-snippet',
    schema: Schema({
      title: String,
      mode: String,
      file: String,
      task: String,
      order: Number,
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
