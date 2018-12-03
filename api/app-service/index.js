const { Router } = require('express')
const router = Router()

const db = require('../mongodb')

/* GET users listing. */
router.get('/', (req, res) => (async () => {
  try {
    const { PageSync } = await db.open()
    const iis = await PageSync.find({ route: 'app-inbound-transfer', module: 'iis-online' })
    const ftp = await PageSync.find({ route: 'app-inbound-transfer', module: 'ftp-online' })
    
    let stats_online = []
    for (const list of iis) {
      stats_online.push({
        key: list.query,
        label: list.data.label,
        online: list.data.online,
      })
    }
    let stats_ftp = []
    for (const list of ftp) {
      stats_ftp.push({
        key: list.query,
        label: list.data.label,
        online: list.data.online,
      })
    }
    res.json({
      online: stats_online,
      ftp: stats_ftp
    })
  } catch (ex) {
    res.sendStatus(404).end()
  }
})())

router.get('/inbound-online', (req, res) => (async () => {
  try {
    const { GlobalConfig, PageSync } = await db.open()
    const iis = await PageSync.find({ route: 'app-inbound-transfer', module: 'iis-online' })
    const ftp = await PageSync.find({ route: 'app-inbound-transfer', module: 'ftp-online' })
    
    for (const list of iis) {
      let { groups } = /(?<segment>\w+?)\.(?<field>\w+)/ig.exec(list.query)
      if (!groups) continue

      const ip = await GlobalConfig.findOne(groups)
      if (!ip) continue

      console.log('iis:', ip.value)
    }

    for (const list of ftp) {
      let { groups } = /(?<segment>\w+?)\.(?<field>\w+)/ig.exec(list.query)
      if (!groups) continue
      
      const ip = await GlobalConfig.findOne(groups)
      if (!ip) continue

      console.log('ftp:', ip.value)
    }
    res.sendStatus(200).end()
  } catch (ex) {
    res.sendStatus(404).end()
  }
})())

router.get('/inbound-transfer', (req, res) => (async () => {
  try {
    const { PageSync } = await db.open()
    let result = {
      graph: (await PageSync.findOne({ route: 'app-inbound-transfer', module: 'panel-graph-hour' })).data || [],
      sequence: (await PageSync.findOne({ route: 'app-inbound-transfer', module: 'panel-sequence' })).data || [],
      status: (await PageSync.findOne({ route: 'app-inbound-transfer', module: 'panel-status' })).data || {}
    }
    res.json(result)
  } catch (ex) {
    res.sendStatus(404).end()
  }
})())
    // route: 'app-inbound-transfer',
    // module: 'iis-online',
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
