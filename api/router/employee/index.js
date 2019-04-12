const { Router } = require('express')
const router = Router()

router.use('/event', require('./event'))

module.exports = router
