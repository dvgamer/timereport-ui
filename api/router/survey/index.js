const { Router } = require('express')
const router = Router()

router.post('/task/history', require('./task'))
router.get('/task/detail/:id', require('./task/detail'))
router.get('/task/edit/:checkin', require('./task/id'))
router.delete('/task/:checkin', require('./task/delete'))
router.get('/task/version/:checkin', require('./task/version'))
router.post('/task/submit', require('./task/submit'))

module.exports = router
