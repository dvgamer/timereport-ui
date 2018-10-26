const { Router } = require('express')
const { MongoConnection } = require('../mongodb')
const router = Router()
const fs = require('fs')
const path = require('path')
const simpleGit = require('simple-git/promise')

const repositories = process.env.GIT_REPOS || 'D:/APP - DevOps/'
const project = path.resolve(path.join(repositories, 'app_terminal.git'))
if (!fs.existsSync(project)) fs.mkdirSync(project)

let conn = { connected: () => false }
if (!conn.connected()) MongoConnection().then(db => { conn = db })

router.get('/', (req, res) => (async () => {
  console.log('git:', project)
  const git = simpleGit(project)

  const isRepo = await git.checkIsRepo()
  if (!isRepo) await git.init(true)
  res.json({ })
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
