const { Router } = require('express')
const router = Router()
const logger = require('@debuger')('SERVER')
const mssql = require('@mssql')

router.get('/task', async (req, res) => {
  let pool = { close: () => {} }
  try {
    pool = await mssql()
    let sql = `SELECT nTaskId, sTitleName, sMenu, sFaIcon, nLevelPermission
    FROM SURVEY_CMG..UserTask WHERE bEnabled = 1 ORDER BY nTaskId ASC`
    let [ records ] = (await pool.request().query(sql)).recordsets
    res.json(records)
  } catch (ex) {
    logger.error(ex)
  } finally {
    pool.close()
    res.end()
  }
})

router.get('/task/history', require('./task'))
router.get('/task/detail/:id', require('./task/detail'))
router.get('/task/edit/:checkin', require('./task/id'))
router.delete('/task/:checkin', require('./task/delete'))
router.get('/task/version/:checkin', require('./task/version'))
router.post('/task/submit', require('./task/submit'))

module.exports = router
