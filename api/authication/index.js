
const ldapAuth = require('./ldap')
const db = require('../mongodb')

let router = {}
if (process.env.NODE_ENV !== 'production') {
  const { Router } = require('express')
  router = Router()
} else {
  const app = require('express')()
  router = app
}

// Import API Routes
router.get('/user', (req, res) => (async () => {
  res.json({})
})().catch((ex) => {
  res.status(401).json({})
}))

router.post('/login', async (req, res) => {
  let { User, UserHistory } = await db.open()
  let date = new Date()
  let raw = req.headers['authorization'].replace(/^basic /ig, '')
  
  let auth = {}
  let IsEncode = false
  try {
    auth = new Buffer.from(raw, 'base64').toString('utf8')
    auth = /(?<usr>.*?):(?<pwd>.*)/ig.exec(auth).groups || {}
    IsEncode = false
  } finally {
  }
  if (!IsEncode) return res.status(401).json({ error: 'Unauthorized (401)'})

  try {
    if (!auth) throw new Error('Unauthorized (402)')
    let data = await ldapAuth(auth.usr, auth.pwd)
    if (data.err) throw new Error(data.err)

    let user = await User.findOne({ mail: groups.usr.trim() })
    if (!user) {
      await new User(Object.assign({
        basic: raw,
        token: 'accss_token',
        lasted: date,
        updated: date,
        created: date
      }, data)).save()
    } else {
      await User.updateOne({ _id: user._id }, {
        $set: {
          basic: raw,
          token: 'accss_token',
          lasted: date
        }
      })
    }

    await new UserHistory({ mail: auth.usr, basic: raw, token: 'accss_token', created: date }).save()
    res.json(data)
  } catch (ex) {
    await new UserHistory({ mail: auth.usr, basic: raw, token: null, created: date }).save()
    res.status(401).json({ error: ex.message })
  }
})

router.post('/logout', (req, res) => (async () => {
  res.json({})
})().catch((ex) => {
  res.status(401).json({})
}))

// Export the server middleware
module.exports = {
  path: '/auth',
  handler: router
}
