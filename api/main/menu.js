const { Router } = require('express')
const router = Router()
const mongo = require('@touno-io/db')()

router.get('/', async (req, res) => {
  await mongo.open()
  const { Config } = mongo.get()
  const menu = await Config.find({ field: 'mainmenu' }, 'value segment')
  res.json(menu.map(e => Object.assign(e.value, { id: e._id, group: e.segment })))
})

module.exports = router
