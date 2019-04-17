const logger = require('@debuger')('SERVER')
const mssql = require('@mssql')
const moment = require('moment')

module.exports = async (req, res) => {
  let page = parseInt(req.body.page || 1)
  let week = parseInt(req.body.week || 0)
  if (isNaN(page)) return res.json([])
  let pool = { close: () => {} }
  try {
    let from = moment().add(week - 1, 'week').format('YYYY-MM-DD')
    let to = moment().add(week, 'week').format('YYYY-MM-DD')
    if (isNaN(page)) return res.json([])

    let sql = `
    SELECT * FROM (
      SELECT ROW_NUMBER() OVER (ORDER BY g.dCreated DESC) AS nRow
        , t.nTaskId, t.sTitleName, g.sKey, sUsername, sName, g.dCreated, MAX(g.dModified) dModified
        , SUM(CASE WHEN sStatus = 'FAIL' THEN 1 ELSE 0 END) nFail
        , SUM(CASE WHEN sStatus = 'WARN' THEN 1 ELSE 0 END) nWarn
        , SUM(CASE WHEN sStatus = 'INFO' THEN 1 ELSE 0 END) nInfo
        , SUM(CASE WHEN sStatus = 'PASS' THEN 1 ELSE 0 END) nPass
      FROM UserTaskSubmit s
      INNER JOIN (
        SELECT CONVERT(VARCHAR,dCheckIn,112) + REPLACE(CONVERT(VARCHAR,dCheckIn,114), ':', '') sKey, nTaskDetailId, MAX(nIndex) nIndex
        , CONVERT(VARCHAR, MIN(dCreated), 120) dCreated
        , CONVERT(VARCHAR, MAX(dCreated), 120) dModified
        FROM UserTaskSubmit
        WHERE CONVERT(DATE, dCreated) >= CONVERT(DATE, '${from}') AND CONVERT(DATE, dCreated) <= CONVERT(DATE, '${to}')
        GROUP BY CONVERT(VARCHAR,dCheckIn,112) + REPLACE(CONVERT(VARCHAR,dCheckIn,114), ':', ''), nTaskDetailId
      ) g ON g.nIndex = s.nIndex
	  INNER JOIN UserTaskDetail d ON d.nTaskDetailId = s.nTaskDetailId
	  INNER JOIN UserTask t ON t.nTaskId = d.nTaskId
      GROUP BY t.nTaskId, t.sTitleName, g.sKey, sUsername, sName, g.dCreated
    ) AS r WHERE nRow <= 100
    `
    pool = await mssql()
    let history = (await pool.request().query(sql)).recordsets

    sql = `SELECT nTaskId, sTitleName, sMenu, sFaIcon, nLevelPermission
    FROM UserTask WHERE bEnabled = 1 ORDER BY nTaskId ASC`
    let tasks = (await pool.request().query(sql)).recordsets

    return res.json({ history: history[0], tasks: tasks[0] })
  } catch (ex) {
    logger.error(ex)
  } finally {
    pool.close()
    res.end()
  }
}
