const { Router } = require('express')
const db = require('../mongodb')
const router = Router()
const fs = require('fs')
const fx = require('mkdir-recursive')
const path = require('path')
const simpleGit = require('simple-git/promise')

const repositories = process.env.GIT_REPOS || './tmp'
const project = path.resolve(path.join(repositories, 'app_terminal.git'))
if (!fs.existsSync(project)) fx.mkdirSync(project)

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
