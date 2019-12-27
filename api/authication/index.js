const jsonwebtoken = require('jsonwebtoken')
const detect = require('browser-detect')
const mongo = require('@touno-io/db')()
const logger = require('@touno-io/debuger')('Auth')
const md5 = require('md5')
const ldapAuth = require('./ldap')
const findUserWithAuth = require('./find-user')
const decodeBasic = require('./decode-basic')

const { Router } = require('express')
const router = Router()

const encodeTokenWithId = _id => jsonwebtoken.sign({ hash: md5(+(new Date())), _id }, process.env.JWT_KEYHASH)
const getUser = (User, auth, param) => {
  const u = auth.user.trim().toLowerCase()
  return User.findOne({ $or: [{ mail: `${u}${!/@/g.test(u) ? '@central.co.th' : ''}` }, { user_name: u }], pwd: md5(auth.pass) }, param)
}

router.get('/user', async (req, res) => {
  try {
    const user = await findUserWithAuth(req)
    return res.json({ user })
  } catch (ex) {
    logger.warning(ex)
    return res.json({})
  }
})

router.post('/activate', async (req, res) => {
  await mongo.open()
  const { User } = mongo.get()
  try {
    if (!req.body.user) throw new Error('Unauthorized 402')

    const checkUser = await getUser(User, req.body, 'enabled activate mail display_name')
    if (!checkUser) throw new Error('Unauthorized 403')
    return res.json({ mail: checkUser.mail, name: checkUser.display_name, enabled: checkUser.enabled, activate: checkUser.activate })
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
    let data = {}
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

    const browser = detect(req.headers['user-agent'])
    const session = await UserSession.findOne({ _id: user._id, name: browser.name, os: browser.os })
    if (!session) {
      const token = encodeTokenWithId(user._id)
      await new UserSession({ user_id: user._id, token, ...browser }).save()
      res.json({ token })
    } else {
      res.json({ token: session.token })
    }
  } catch (ex) {
    res.status(404).json({ error: ex.message || ex })
  }
})

router.post('/logout', async (req, res) => {
  const auth = decodeBasic(req.headers.authorization)
  if (auth && auth.user) {
    await mongo.open()
    const { User, UserSession } = mongo.get()
    const user = await getUser(User, auth)
    const browser = detect(req.headers['user-agent'])
    await UserSession.deleteMany({ _id: user._id, name: browser.name, os: browser.os })
  }
  res.json({ ok: true })
})

// Export the server middleware
module.exports = router
