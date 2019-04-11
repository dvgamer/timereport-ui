const logger = require('@debuger')('SERVER')
const mssql = require('@mssql')
const moment = require('moment')

module.exports = async (req, res) => {
  if (isNaN(parseInt(req.params.checkin))) return res.json({})
  let pool = { close: () => {} }
  let { checkin } = req.params
  logger.info('History ID:', checkin, 'Deleted.')
  let dCheckIn = moment(checkin, 'YYYYMMDDHHmmssSSS')
  if (!moment.isMoment(dCheckIn)) return res.json({})
  try {
    let sql = `DELETE FROM UserTaskSubmit WHERE dCheckIn = CONVERT(DATETIME, '${dCheckIn.format('YYYY-MM-DD HH:mm:ss.SSS')}')`
    pool = await mssql()
    await pool.request().query(sql)
    return res.json({})
  } catch (ex) {
    logger.error(ex)
  } finally {
    pool.close()
    res.end()
  }
}
