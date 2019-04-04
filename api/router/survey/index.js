const { Router } = require('express')
const router = Router()

router.get('/task/history', require('./task'))
router.get('/task/detail/:checkin', require('./task/detail'))
router.get('/task/edit/:checkin', require('./task/id'))
router.post('/task/del/:checkin', require('./task/delete'))
router.get('/task/version/:checkin', require('./task/version'))
router.post('/task/submit', require('./task/submit'))

module.exports = router
