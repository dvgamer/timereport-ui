const { Router } = require('express')
const router = Router()

router.get('/service/:segment', require('./service-config'))

module.exports = router
