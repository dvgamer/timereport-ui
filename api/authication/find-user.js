const mongo = require('@touno-io/db')()
const detect = require('browser-detect')
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
  'user_level',
  'lasted',
  'enabled',
  'activate'
]

module.exports = async (req) => {
  await mongo.open()
  const { User, UserSession } = mongo.get()
  const decode = decodeBearer(req.headers.authorization)
  if (!decode._id) return {}

  const browser = detect(req.headers['user-agent'])
  const session = await UserSession.findOne({ _id: decode._id, name: browser.name, os: browser.os })

  if (!session) return {}
  return User.findOne({ _id: decode._id }, userData.join(' '))
}
