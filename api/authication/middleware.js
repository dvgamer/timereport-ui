const getUser = require('./user')

module.exports = async (req, res, nuxt) => {
  req.auth = await getUser(req)
  if (req.auth) {
    nuxt()
  } else {
    res.status(404).end()
  }
}
