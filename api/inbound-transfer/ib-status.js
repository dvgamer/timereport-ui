
const sql = require('mssql')
const prod = require('../config-prod.js')

module.exports = async () => {
  let pool = await sql.connect(prod)
  let results = await pool.request().query(`
    SELECT COUNT(*) nTotal FROM POSGW..TFileTransUp a WITH(NOLOCK)
      WHERE a.sStatus IN (3,5)
    UNION ALL SELECT COUNT(*) FROM POSGW..TFileTransUp a WITH(NOLOCK)
    WHERE a.sStatus IN (4,6) AND
      CONVERT(DATETIME,STUFF(STUFF(CONVERT(VARCHAR(8), nStartDate),5,0,'-'),8,0,'-')+' '+STUFF(STUFF(LEFT(RIGHT('000000' + CONVERT(VARCHAR(6), nStartTime), 6),6),3,0,':'),6,0,':'),120)
      >= CONVERT(DATE, GETDATE())
    UNION ALL SELECT COUNT(*) FROM POSGW..TFileTransUp a WITH(NOLOCK)
    WHERE a.sStatus = 0 AND
      CONVERT(DATETIME,STUFF(STUFF(CONVERT(VARCHAR(8), nStartDate),5,0,'-'),8,0,'-')+' '+STUFF(STUFF(LEFT(RIGHT('000000' + CONVERT(VARCHAR(6), nStartTime), 6),6),3,0,':'),6,0,':'),120)
      >= CONVERT(DATE, GETDATE())
  `)
  sql.close()
  if (!!results['recordset']) {
    return {
      wait: results['recordset'][0].nTotal,
      fail: results['recordset'][1].nTotal,
      complete: results['recordset'][2].nTotal
    }
  } else {
    return { wait: 0, fail: 0, complete: 0 }
  }
}