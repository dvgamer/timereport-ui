const mongo = require('@touno-io/db')
const decodeBearer = require('./decode-bearer')

// Import API Routes
const userData = [
  'name',
  'mail',
  'title',
  'company',
  'department',
  'office_name',
  'description',
  'display_name',
  'telephone_no',
  'user_name',
  'user_type',
  'user_level',
  'lasted',
  'enabled',
  'activate'
]

module.exports = async (auth) => {
  await mongo.open()
  const { User } = mongo.get()
  const decode = decodeBearer(auth)
  if (!decode._id) return {}

  return User.findOne({ _id: decode._id }, userData.join(' '))
}
