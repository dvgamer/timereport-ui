const mongoose = require('mongoose')
const { Schema } = mongoose
// const { Mixed } = Schema.Types

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
      birthday: {
        type: Date,
        index: true
      },
      resign: {
        type: Boolean,
        index: true
      },
      created: Date
    })
  }
]
