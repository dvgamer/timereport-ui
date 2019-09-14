const { Router } = require('express')
const aLog = require('./log-mongo')
const router = Router()

router.put('/:app/:group/:status/:msg?', async (req, res) => {
  try {
    let getLevel = parseInt(req.headers['level'])
    let { app, group, status, msg } = req.params
    let { text, level } = req.body
  
    getLevel = !isNaN(getLevel) ? getLevel : level ? level : 0
    msg = msg || (!text ? JSON.stringify(req.body) : text)
    if (msg === '{}' || msg === '[]') return res.end()
    if (!app || !group || !status) return res.end()

    aLog(getLevel, app, (group !== 'null' ? group : ''), status, msg)
  } catch (ex) {
    res.status(404)
  } finally {
    res.end()
  }
})

module.exports = {
  path: '/log',
  handler: router
}
