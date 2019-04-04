const ldapAuth = require('./ldap')
const db = require('@mongo')
const bodyParser = require('body-parser')
// const session = require('express-session')
const jsonwebtoken = require('jsonwebtoken')
const logger = require('@debuger')('AUTH')
const md5 = require('md5')

let router = {}
if (process.env.NODE_ENV !== 'production') {
  const { Router } = require('express')
  router = Router()
} else {
  const app = require('express')()
  router = app
}

router.use(bodyParser.json())

// Sessions to create `req.session`
if (!process.env.JWT_KEYHASH) throw new Error('Environment `JWT_KEYHASH` is undefined.')

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

const encodeToken = data => {
  const hashId = md5(data.mail + (+(new Date())))
  return jsonwebtoken.sign({ hash: hashId, ...data }, process.env.JWT_KEYHASH)
} 

const decodeBearer = req => {
  let auth = req.headers['authorization'] || ''
  if (!/^bearer./ig.test(auth)) return {}
  auth = auth.replace(/^bearer./ig, '')
  if (auth === 'undefined' || auth === 'false') {
    logger.warning('User authorization is undefined.')
    return {}
  }

  return jsonwebtoken.verify(auth, process.env.JWT_KEYHASH)
}
const decodeBasic = req => {
  let auth = req.headers['authorization'] || ''
  if (!/^basic./ig.test(auth)) return {}
  try {
    auth = new Buffer.from(auth.replace(/^basic./ig, ''), 'base64').toString('utf8')
    return /(?<usr>.*?):(?<pwd>.*)/ig.exec(auth).groups || {}
  } catch (ex) {
    logger.warning(ex)
    return {}
  }
}

router.get('/user', async (req, res) => {
  try {
    let { User } = await db.open()
    let decode = decodeBearer(req)
    if (!decode._id) return res.json({})

    let data = await User.findById(decode._id, userData.join(' '))
    return res.json({ user: data })
  } catch (ex) {
    logger.warning(ex)
    return res.json({})
  }
})

router.post('/activate', async (req, res) => {
  let { User } = await db.open()
  try {
    let { user, pass } = req.body
    if (!user) throw new Error('Unauthorized 402')
    user = user.trim().toLowerCase()

    let acc = await User.findOne({
      $or: [ { mail: `${user}${!/@/g.test(user) ? '@central.co.th' : ''}` }, { user_name: user } ],
      pwd: md5(pass)
    }, 'enabled activate mail display_name')
    if (!acc) throw new Error('Unauthorized 403')
    return res.json({ mail: acc.mail, name: acc.display_name, enabled: acc.enabled, activate: acc.activate })
  } catch (ex) {
    return res.json({ error: ex.message || ex })
  }
})

router.post('/login', async (req, res) => {
  let date = new Date()
  let { user, pass } = req.body
  let auth = { usr: user, pwd: pass }
  if (req.headers['authorization'] && !user) {
    auth = decodeBasic(req)
    if (!auth || !auth.usr) {
      logger.log(`Login -- Unauthorized (401)`)
      return res.status(401).json({ error: 'Unauthorized (401)'})
    }
  }
  auth.usr = auth.usr.trim().toLowerCase()
  
  let { User, UserHistory } = await db.open()
  try {
    let user = await User.findOne({
      $or: [ { mail: `${auth.usr}${!/@/g.test(auth.usr) ? '@central.co.th' : ''}` }, { user_name: auth.usr } ]
    })

    let data = null
    try {
      // logger.log('LDAP:', auth.usr,)
      data = await ldapAuth(auth.usr, auth.pwd)
      if (!data.user_name) throw new Error('LDAP auth unsuccessful.')
      data = Object.assign(data, {
        mail: data.mail.trim().toLowerCase(),
        user_name: data.user_name.trim().toLowerCase()
      })
      // logger.log('email:', data.mail)
      // logger.log('title:', data.title)
      // logger.log('Company:', data.company)
    } catch (ex) {
      // logger.log('LDAP:', ex.message)
      data = { error: ex.message || ex }
    }
    if (!user && data.error) throw new Error(data.error)

    if (!user) {
      user = await new User(Object.assign({
        pwd: md5(auth.pwd),
        token: null,
        user_level: 0,
        activate: true,
        enabled: true,
        lasted: date,
        updated: date,
        created: date
      }, data)).save()
    } else {
      await User.updateOne({ _id: user._id }, {
        $set: { pwd: md5(auth.pwd), token: null, lasted: date }
      })
    }
 
    let accessToken = encodeToken({ _id: user._id })
    await User.updateOne({ _id: user._id }, { $set: { token: accessToken } })
    if (user.activate && user.enabled) {
      logger.log(`Login (success) -- ${auth.usr}`)
      await new UserHistory({ mail: auth.usr, error: data.err, token: accessToken, created: date }).save()
      return res.json({ token: accessToken })
    } else {
      logger.log(`Login (suspended) -- ${auth.usr}`)
      await new UserHistory({ mail: auth.usr, error: 'account suspended or inactivate', token: accessToken, created: date }).save()
      return res.status(401).json({ error: 'Unauthorized (403)' })
    }

  } catch (ex) {
    logger.log(`Login (fail) -- ${(ex.message || ex)}`)
    await new UserHistory({ mail: auth.usr, error: (ex.message || ex), token: null, created: date }).save()
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
module.exports = {
  path: '/auth',
  handler: router
}
