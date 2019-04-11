const mongoose = require('mongoose')
const { Schema } = mongoose
const { Mixed } = Schema.Types

module.exports = [
  {
    id: 'Employee',
    name: 'db-employee',
    schema: Schema({
      id: {
        type: String,
        index: true
      },
      fullname_th: String,
      fullname_en: String,
      sex: String,
      department: String,
      birdthday: {
        type: Date,
        index: true
      },
      resign: {
        type: Boolean,
        index: true
      },
      created: Date
    })
  },
  {
    id: 'BotConfig',
    name: 'db-bot-config',
    schema: Schema({
      segment: {
        type: String,
        index: true
      },
      field: {
        type: String,
        index: true
      },
      value: Mixed,
      created: Date
    })
  }
]
