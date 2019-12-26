const jsonwebtoken = require('jsonwebtoken')
const mongo = require('@touno-io/db')
const logger = require('@touno-io/debuger')('Auth')
const md5 = require('md5')
const ldapAuth = require('./ldap')
const findUserWithAuth = require('./find-user')
const decodeBasic = require('./decode-basic')

const { Router } = require('express')
const router = Router()

const encodeTokenWithId = _id => jsonwebtoken.sign({ hash: md5(+(new Date())), _id }, process.env.JWT_KEYHASH)

router.get('/user', async (req, res) => {
  try {
    const user = await findUserWithAuth(req.headers.authorization)
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
    let { user, pass } = req.body
    if (!user) throw new Error('Unauthorized 402')
    user = user.trim().toLowerCase()

    const checkUser = await User.findOne({
      $or: [{ mail: `${user}${!/@/g.test(user) ? '@central.co.th' : ''}` }, { user_name: user }],
      pwd: md5(pass)
    }, 'enabled activate mail display_name')
    if (!checkUser) throw new Error('Unauthorized 403')
    return res.json({ mail: checkUser.mail, name: checkUser.display_name, enabled: checkUser.enabled, activate: checkUser.activate })
  } catch (ex) {
    return res.json({ error: ex.message || ex })
  }
})

router.post('/login', async (req, res) => {
  let auth = req.body
  if (!auth) {
    auth = decodeBasic(req.headers.authorization)
    if (!auth || !auth.user) {
      logger.log('Login -- Unauthorized (401)')
      return res.status(401).json({ error: 'Unauthorized (401)' })
    }
  }
  auth.user = auth.user.trim().toLowerCase()
  try {
    await mongo.open()
    const { User, UserSession } = mongo.get()

    let user = await User.findOne({ $or: [{ mail: `${auth.user}${!/@/g.test(auth.user) ? '@central.co.th' : ''}` }, { user_name: auth.user }] })
    let data = await ldapAuth(auth.user, auth.pass)

    if (!data.user_name && !user) throw new Error('LDAP auth unsuccessful.')
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
          activate: true,
          enabled: true,
          lasted: new Date(),
          updated: new Date()
        }, data)).save()
      } else {
        await User.updateOne({ _id: user._id }, {
          $set: Object.assign({ pwd: md5(auth.pass), token: null, lasted: new Date() }, data)
        })
      }
    }

    const accessToken = encodeTokenWithId(user._id)
    await User.updateOne({ _id: user._id }, { $set: { token: accessToken } })
    if (user.activate && user.enabled) {
      logger.log(`Login (success) -- ${auth.user}`)
      await new UserHistory({ mail: auth.user, error: data.err, token: accessToken, created: date }).save()
      return res.json({ token: accessToken })
    } else {
      logger.log(`Login (suspended) -- ${auth.user}`)
      await new UserHistory({ mail: auth.user, error: 'account suspended or inactivate', token: accessToken, created: date }).save()
      return res.status(401).json({ error: 'Unauthorized (403)' })
    }

  } catch (ex) {
    logger.log(`Login (fail) -- ${(ex.message || ex)}`)
    await new UserHistory({ mail: auth.user, error: (ex.message || ex), token: null, created: date }).save()
    return res.status(404).json({ error: ex.message || ex })
  }
})

router.post('/logout', async (req, res) => {
  res.json({ ok: true })
})

if (process.env.NODE_ENV === 'production') {
  logger.start(`Authentication created.`)
}
// Export the server middleware
module.exports = router
