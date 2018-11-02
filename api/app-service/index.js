const { Router } = require('express')
const router = Router()

const db = require('../mongodb')

/* GET users listing. */
router.get('/inbound-transfer', (req, res) => (async () => {
  const { PageSync } = await db.open()
  let result = {
    graph: (await PageSync.findOne({ route: 'app-inbound-transfer', module: 'panel-graph-hour' })).data,
    sequence: (await PageSync.findOne({ route: 'app-inbound-transfer', module: 'panel-sequence' })).data,
    status: (await PageSync.findOne({ route: 'app-inbound-transfer', module: 'panel-status' })).data
  }
  res.json(result)
})())

// /* GET user by ID. */
// router.get('/inbound-transfer/:id', function (req, res, next) {
//   const id = parseInt(req.params.id)
//   if (id >= 0 && id < users.length) {
//     res.json(users[id])
//   } else {
//     res.sendStatus(404)
//   }
// })

module.exports = router
