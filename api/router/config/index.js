const { Router } = require('express')
const router = Router()

router.get('/bot/:segment', require('./bot-service'))

module.exports = router
