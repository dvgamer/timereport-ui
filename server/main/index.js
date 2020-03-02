const { Router } = require('express')
const router = Router()

router.use('/menu', require('./menu'))

module.exports = router
