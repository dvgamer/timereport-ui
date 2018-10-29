const mongoose = require('mongoose')
const { Mixed } = mongoose.Schema.Types
module.exports = [
  {
    id: 'Touno',
    name: 'db-snippet',
    schema: mongoose.Schema({
      group: String,
      item: String,
      data: Mixed
    })
  }
]
