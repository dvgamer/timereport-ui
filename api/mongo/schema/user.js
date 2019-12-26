const { ObjectId } = require('@touno-io/db/type')

module.exports = [
  {
    id: 'User',
    name: 'db-user',
    schema: {
      name: { type: String, index: true },
      mail: { type: String, index: true },
      title: { type: String, index: true },
      company: String,
      department: String,
      office_name: String,
      description: String,
      display_name: String,
      telephone_no: String,
      employee_id: String,
      user_name: String,
      user_type: String,
      user_level: Number,
      pwd: String,
      permission: String,
      token: String,
      enabled: { type: Boolean, index: true },
      lasted: { type: Date, index: true }
    }
  },
  {
    id: 'UserSession',
    name: 'db-user-session',
    schema: {
      user_id: { type: ObjectId, index: true },
      name: { type: String, index: true },
      os: { type: String, index: true },
      version: String,
      versionNumber: Number,
      mobile: Boolean,
      token: String
    }
  }
]
