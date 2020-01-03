const { Router } = require('express')
const router = Router()
const mongo = require('@touno-io/db')()

router.get('/', async (req, res) => {
  await mongo.open()
  const { Config } = mongo.get()
  const menu = await Config.find({ segment: 'main', field: 'mainmenu' }, 'value')
  res.json(menu.map(e => Object.assign({ id: e._id }, e.value)))
})

module.exports = router
