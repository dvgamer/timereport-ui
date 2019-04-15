const { Router } = require('express')
const router = Router()

router.post('/:page?', require('@auth'), require('./list'))

module.exports = router
