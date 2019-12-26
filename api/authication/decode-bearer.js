const logger = require('@debuger')('AUTH')
const jsonwebtoken = require('jsonwebtoken')

module.exports = (auth = '') => {
  if (!/^bearer./ig.test(auth)) return {}
  auth = auth.replace(/^bearer./ig, '')
  if (auth === 'undefined' || auth === 'false') {
    logger.warning('User authorization is undefined.')
    return
  }

  return jsonwebtoken.verify(auth, process.env.JWT_KEYHASH)
}
