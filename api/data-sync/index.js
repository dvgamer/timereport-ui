const sql = require('mssql')
const moment = require('moment')
const mongo = require('@mongo')
const cron = require('node-cron')
const global = require('@global')
const logger = require('@debuger')('SYNC')
 
const dbNormalize = {
  'app-inbound-transfer|panel-status': (data, records) => {
    return { wait: records[0]['nTotal'], fail: records[1]['nTotal'], complete: records[2]['nTotal'] }
  }
}

const sqlConnectionPool = () => new Promise((resolve, reject) => {
  global('database.posdb').then(posdb => {
    const conn = new sql.ConnectionPool(posdb.rep)
    conn.connect(err => {
      if (err) return reject(err)
      resolve(conn)
    })
  }).catch(reject)
})

let cronJobs = {}

module.exports = async () => {
  let { PageSync } = await mongo.open()
  let pool = await sqlConnectionPool()
  
  let sync = await PageSync.find({ crontab: { $ne: null } })
  let retryLimit = 3

  logger.log(`Data-Sync ${sync.length} jobs.`)
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
          // logger.log(`[${retry}/${retryLimit}] Sync '${key}' updated: ${!(!recheck || !recheck.data)}`)
        } while (retry <= retryLimit && (!recheck || !recheck.data))
      } catch (ex) {
        logger.error('taskJob-Name: ', key)
        logger.error('taskJob-Message: ', ex.message)
        logger.error(ex.stack)
      }
      if (retry > retryLimit) process.exit(1)
      // pool.close()
    }
    try {
      await taskJob()
      cronJobs[key] = cron.schedule(data.crontab, () => {
        taskJob().catch(ex => {
          logger.log(` - ${moment().format('YYYY-MM-DD HH:mm:ss')} - ${key} fail::${ex.message}`)
        })
      })
      logger.log(`Crontab: ${data.crontab}, Sync '${key}' created.`)
    } catch (ex) {
      logger.log(`Crontab: ${data.crontab}, Sync '${key}' fail::${ex.message}.`)
    }
  }
}
