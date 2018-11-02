const sql = require('mssql')
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

const dbDataSync = async () => {
  let { PageSync } = await db.open()

  let sync = await PageSync.find({})
  console.log(`Page Data Sync ${sync.length} jobs.`)
  for (let i = 0; i < sync.length; i++) {
    const data = sync[i]
    const key = `${data.route}|${data.module}`
    console.log(`Sync '${key}' crontab: ${data.crontab}`)
    cron.schedule(data.crontab, () => (async () => {
      let pool = { close: () => {} }
      try {
        pool = await sqlConnectionPool()

        let [ records ] = (await pool.request().query(data.query)).recordsets
        await PageSync.updateOne({ _id: data._id }, {
          $set: {
            data: !dbNormalize[key] ? records : dbNormalize[key](data, records),
            updated: new Date()
          }
        })
      } catch (ex) {
        console.log('crontab: ', ex.message)
        console.log(ex.stack)
      }
      pool.close()
    })().catch(ex => {
      console.log('crontab: ', ex.message)
      console.log(ex.stack)
    }))
  }
}

dbDataSync()