const { Router } = require('express')
const router = Router()

const moment = require('moment')
const request = require('request-promise')
const PromiseFtp = require('promise-ftp')
const mongo = require('@mongo')

/* GET users listing. */
router.get('/', (req, res) => (async () => {
  try {
    const { PageSync } = await mongo.open()
    const iis = await PageSync.find({ route: 'app-inbound-transfer', module: 'iis-online' })
    const ftp = await PageSync.find({ route: 'app-inbound-transfer', module: 'ftp-online' })
    
    let stats_online = []
    for (const list of iis) {
      stats_online.push({
        key: list.query,
        label: list.data.label,
        online: list.data.online,
        msg: list.data.msg
      })
    }
    let stats_ftp = []
    for (const list of ftp) {
      stats_ftp.push({
        key: list.query,
        label: list.data.label,
        online: list.data.online,
        msg: list.data.msg
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
    const { GlobalConfig, PageSync } = await mongo.open()
    const iis = await PageSync.find({ route: 'app-inbound-transfer', module: 'iis-online' })
    const ftp = await PageSync.find({ route: 'app-inbound-transfer', module: 'ftp-online' })
    
    for (const list of iis) {
      let { groups } = /(?<segment>\w+?)\.(?<field>\w+)/ig.exec(list.query)
      if (!groups) continue

      const ip = await GlobalConfig.findOne(groups)
      if (!ip) continue

      let ip_res = {}
      try {
        ip_res = await request({ method: 'GET', uri: ip.value, resolveWithFullResponse: true, timeout: 3000 })
      } catch (ex) {}
      await PageSync.findOneAndUpdate(list._id, { 'data.online': ip_res.statusCode === 200 })
    }
 
    for (const list of ftp) {
      let { groups } = /(?<segment>\w+?)\.(?<field>\w+)/ig.exec(list.query)
      if (!groups) continue

      const ip = await GlobalConfig.findOne(groups)
      if (!ip) continue

      const ftp = new PromiseFtp()
      let serverMessage = null
      try {
        serverMessage = await ftp.connect({ host: ip.value.addr, user: ip.value.usr, password: ip.value.pwd, connTimeout: 5000 })
        await ftp.end()
      } catch (ex) {}
      await PageSync.findOneAndUpdate(list._id, { 'data.online': serverMessage != null})
    }
    res.sendStatus(200).end()
  } catch (ex) {
    console.log(ex)
    res.sendStatus(502).end()
  }
})())

router.get('/inbound-transfer', (req, res) => (async () => {
  try {
    const { PageSync } = await mongo.open()
    let result = {
      graph: (await PageSync.findOne({ route: 'app-inbound-transfer', module: 'panel-graph-hour'  })).data || {},
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
