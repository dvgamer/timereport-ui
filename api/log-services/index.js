const { Router } = require('express')
const router = Router()

router.put('/:app/:group/:status/:msg?', require('./write'))
router.post('/audit/:page?', require('./audit'))

module.exports = router
