const { Router } = require('express')
const router = Router()

const dataStatus = require('./ib-status.js')
/* GET users listing. */
router.get('/inbound-transfer/status', (req, res) => {
  dataStatus().then(data => {
    res.json(data)
  }).catch(ex => {
    res.json({ error: ex.message.replace(/\\/ig,'\\\"') })
  })
})

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
