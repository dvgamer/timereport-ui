const { Router } = require('express')
const aLog = require('./log-mongo')
const router = Router()

router.put('/:app/:group/:status/:msg?', async (req, res) => {
  try {
    let level = parseInt(req.headers['level'] || 0)
    level = !isNaN(level) ? level : 0
    let { app, group, status, msg } = req.params
    let { text } = req.body
    msg = msg || (!text ? JSON.stringify(req.body) : text)
    if (msg === '{}' || msg === '[]') return res.end()
    if (!app || !group || !status) return res.end()

    aLog(level, app, (group !== 'null' ? group : ''), status, msg)
  } catch {
    res.status(404)
  } finally {
    res.end()
  }
})
router.post('/audit/:page?', require('./audit'))

module.exports = router
