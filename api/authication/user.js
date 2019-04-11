const db = require('@mongo')
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
  'activate',
  'created'
]

module.exports = async (req) => {
  let { User } = await db.open()
  let decode = decodeBearer(req)
  if (!decode._id) return null

  return await User.findById(decode._id, userData.join(' '))
}