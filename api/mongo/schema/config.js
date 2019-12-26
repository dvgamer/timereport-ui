const { Mixed } = require('@touno-io/db/type')

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
    id: 'Snippet',
    name: 'db-snippet',
    schema: {
      title: String,
      mode: String,
      file: String,
      task: String,
      order: Number,
      user: String,
      avatar: String,
      private: Boolean,
      content: String
    }
  }
]
