const mongo = require('@mongo')
const debuger = require('@debuger')

module.exports = async (req, res) => {
  try {
    let { app, group, status, msg } = req.params
    let { text } = req.body
    msg = msg || (!text ? JSON.stringify(req.body) : text)
    if (msg === '{}' || msg === '[]') return res.end()
    if (!app || !group || !status || !logger[status]) return res.end()

    let logger = debuger(app)
    const { ServiceLog } = await mongo.open()
    
    if (process.env.NODE_ENV === 'production' && (status === 'error' || status === 'warn')) {
      logger[status](`${group !== 'null' ? `[${group}]` : ''} ${msg}`)
    }
    new ServiceLog({ app, group: (group !== 'null' ? group : ''), status, message: msg, created: new Date() }).save()
  } catch {
    res.statusCode(404)
  } finally {
    res.end()
  }
}
