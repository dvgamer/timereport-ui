const { Router } = require('express')
const router = Router()

router.get('/check-hour/:hour', require('./check-hour'))

// Export the server middleware
module.exports = router