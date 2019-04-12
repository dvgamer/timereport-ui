const { Router } = require('express')
const router = Router()

router.get('/birthday', require('./birthday'))

module.exports = router
