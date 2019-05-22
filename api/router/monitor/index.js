const { Router } = require('express')
const router = Router()

router.get('/check-hour/:hour', require('./check-hour'))
router.post('/run-task', require('./run-task'))

// Export the server middleware
module.exports = router