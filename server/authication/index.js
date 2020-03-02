const jsonwebtoken = require('jsonwebtoken')
const detect = require('browser-detect')
const mongo = require('@touno-io/db')()
const logger = require('@touno-io/debuger')('Auth')
const md5 = require('md5')
const ldapAuth = require('./ldap')
const decodeBasic = require('./decode-basic')
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
  'enabled'
]

const { Router } = require('express')
const router = Router()

const encodeTokenWithId = _id => jsonwebtoken.sign({ hash: md5(+(new Date())), _id }, process.env.JWT_KEYHASH)
const getUser = (User, auth, param) => {
  if (!auth.user) throw new Error('username is undefined.')
  const u = auth.user.trim().toLowerCase()
  return User.findOne({ $or: [{ mail: `${u}${!/@/g.test(u) ? '@central.co.th' : ''}` }, { user_name: u }], pwd: md5(auth.pass) }, param)
}

router.get('/user', async (req, res) => {
  try {
    await mongo.open()
    const { User, UserSession } = mongo.get()
    const decode = decodeBearer(req.headers.authorization)
    if (!decode._id) throw new Error('Unknow decode bearer.')

    const session = await UserSession.findOne({ _id: decode._id, expired: { $gte: new Date() } })
    if (!session) throw new Error('UserSession session expire.')

    const date = new Date()
    await UserSession.updateOne({ _id: decode._id }, { expired: date.setDate(date.getDate() + 1) })
    const user = await User.findOne({ _id: session.user_id }, userData.join(' '))
    if (!user) throw new Error('User unknow expire.')
    return res.json({ user })
  } catch (ex) {
    logger.error(ex)
    return res.status(404).json({ error: ex.message || ex })
  }
})

router.post('/activate', async (req, res) => {
  await mongo.open()
  const { User } = mongo.get()
  try {
    if (!req.body.user) throw new Error('Unauthorized 402')

    const checkUser = await getUser(User, req.body, 'enabled mail display_name')
    if (!checkUser) throw new Error('Unauthorized 403')
    return res.json({ mail: checkUser.mail, name: checkUser.display_name, enabled: checkUser.enabled })
  } catch (ex) {
    return res.json({ error: ex.message || ex })
  }
})

router.post('/login', async (req, res) => {
  let auth = req.body
  try {
    if (!auth) {
      auth = decodeBasic(req.headers.authorization)
      if (!auth || !auth.user) throw new Error('Unauthorized (401)')
    }
    auth.user = auth.user.trim().toLowerCase()
    await mongo.open()
    const { User, UserSession } = mongo.get()

    let user = await getUser(User, auth)
    let data = null
    try {
      data = await ldapAuth(auth.user, auth.pass)
    } finally { }

    if ((!data || !data.user_name) && !user) throw new Error('LDAP auth unsuccessful.')
    if (data.user_name) {
      data = Object.assign(data, {
        mail: data.mail.trim().toLowerCase(),
        user_name: data.user_name.trim().toLowerCase()
      })

      if (!user) {
        user = await new User(Object.assign({
          pwd: md5(auth.pass),
          token: null,
          user_level: 0,
          enabled: false,
          lasted: new Date()
        }, data)).save()
      } else {
        await User.updateOne({ _id: user._id }, {
          $set: Object.assign({ pwd: md5(auth.pass), lasted: new Date() }, data)
        })
      }
    }
    if (!user.enabled) throw new Error('Unauthorized (403)')

    const date = new Date()
    const browser = detect(req.headers['user-agent'])
    const session = await new UserSession({ user_id: user._id, ...browser, expired: date.setDate(date.getDate() + 1) }).save()
    const token = encodeTokenWithId(session._id)
    res.json({ token })
  } catch (ex) {
    logger.error(ex)
    res.status(404).json({ error: ex.message || ex })
  }
})

router.post('/logout', async (req, res) => {
  const decode = decodeBearer(req.headers.authorization)
  if (!decode._id) throw new Error('Unknow decode bearer.')

  await mongo.open()
  const { UserSession } = mongo.get()
  await UserSession.deleteMany({ _id: decode._id })
  res.json({ ok: true })
})

// Export the server middleware
module.exports = router
