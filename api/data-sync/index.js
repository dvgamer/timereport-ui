const consola = require('consola')
const sql = require('mssql')
const db = require('../mongodb')
const prod = require('../config-prod.js')


const prepare = require('./prepare-page')

let whileLoopTimeout = (func, second) => {
  let isExit = null
  let loop = 0
  consola.info(`while lopp every ${second} seconds.`)
  if (!second || !func) throw new Error('parameter not setting.')
  let funcNext = async () => {
    try {
      let data = await func()
    } catch (ex) {
      isExit = ex
      consola.error(ex)
      clearTimeout(loop)
    }
    loop = setTimeout(funcNext, second * 1000)
  }
  return funcNext()
}


module.exports = async () => {
  let pool = await sql.connect(prod['posgw'])
  let { Page } = await db.open()
  await prepare()

  let inboundStatus = { route: 'app-inbound-transfer', module: 'panel-status' }
  let status = await Page.findOne(inboundStatus)
  whileLoopTimeout(async () => {
    let [ records ] = (await pool.request().query(status.query)).recordsets
    await Page.updateOne(inboundStatus, {
      $set: {
        data: { wait: records[0]['nTotal'], fail: records[1]['nTotal'], complete: records[2]['nTotal'] },
        updated: new Date()
      }
    })
  }, 2)

  whileLoopTimeout(async () => {
    return []
  }, 10)

  whileLoopTimeout(async () => {
    return []
  }, 5)
  
}