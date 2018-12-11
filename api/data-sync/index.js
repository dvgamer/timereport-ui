const sql = require('mssql')
const moment = require('moment')
const db = require('../mongodb')
const cron = require('node-cron')
const prod = require('../config-prod.js')
 
const dbNormalize = {
  'app-inbound-transfer|panel-status': (data, records) => {
    return { wait: records[0]['nTotal'], fail: records[1]['nTotal'], complete: records[2]['nTotal'] }
  }
}

const sqlConnectionPool = () => new Promise((resolve, reject) => {
  const conn = new sql.ConnectionPool(prod['posdb'])
  conn.connect(err => {
    if (err) return reject(err)
    resolve(conn)
  })
})

let cronJobs = {}

const dbDataSync = async () => {
  let { PageSync } = await db.open()
  let pool = await sqlConnectionPool()
  
  let sync = await PageSync.find({ crontab: { $ne: null } })
  let retryLimit = 3

  console.log(`Data-Sync ${sync.length} jobs.`)
  for (let i = 0; i < sync.length; i++) {
    const data = sync[i]
    const key = `${data.route}|${data.module}`

    const taskJob = async () => {
      let retry = 0
      try {
        let recheck = null
        do {
          retry++
          let [ records ] = (await pool.request().query(data.query)).recordsets
          if (!records) throw new Error('pool request no transaction recordsets.')
          let newData = !dbNormalize[key] ? records : dbNormalize[key](data, records)

          await PageSync.updateOne({ _id: data._id }, {
            $set: { data: newData, updated: new Date() }
          })
          recheck = await PageSync.findOne({ _id: data._id })
          console.log(`[${retry}/${retryLimit}] Sync '${key}' updated: ${!(!recheck || !recheck.data)}`)
        } while (retry <= retryLimit && (!recheck || !recheck.data))
      } catch (ex) {
        console.log('taskJob-Name: ', key)
        console.log('taskJob-Message: ', ex.message)
        console.log(ex.stack)
        console.log('')
      }
      if (retry > retryLimit) process.exit(1)
      // pool.close()
    }
    try {
      await taskJob()
      cronJobs[key] = cron.schedule(data.crontab, () => {
        taskJob().catch(ex => {
          console.log(` - ${moment().format('YYYY-MM-DD HH:mm:ss')} - ${key} fail::${ex.message}`)
        })
      })
      console.log(`Crontab: ${data.crontab}, Sync '${key}' created.`)
    } catch (ex) {
      console.log(`Crontab: ${data.crontab}, Sync '${key}' fail::${ex.message}.`)
    }
  }
}

dbDataSync()
