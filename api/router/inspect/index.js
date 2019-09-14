const { Router } = require('express')
const mongo = require('@mongo')
const router = Router()
const fs = require('fs')
const fx = require('mkdir-recursive')
const path = require('path')
// const simpleGit = require('simple-git/promise')

const repositories = process.env.GIT_REPOS || './tmp'
const project = path.resolve(path.join(repositories, 'app_terminal.git'))
if (!fs.existsSync(project)) fx.mkdirSync(project)

router.get('/', (req, res) => (async () => {
  res.json({ })
})().catch((ex) => {
  res.json({ error: ex.message, stack: ex.stack })
}))

router.get('/snippet', (req, res) => (async () => {
  let { Snippet } = await mongo.open()
  let data = await Snippet.find({})
  res.json(data)
})().catch((ex) => {
  res.json({ error: ex.message, stack: ex.stack })
}))

router.get('/snippet/new', (req, res) => (async () => {
  // let { Snippet } = await mongo.open()
  // let data = require('../data/snippet')
  // await Snippet.deleteMany({})
  // for (let i = 0; i < data.length; i++) {
  //   await new Snippet(data[i]).save()
  // }

  res.json({})
})().catch((ex) => {
  res.json({ error: ex.message, stack: ex.stack })
}))


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
