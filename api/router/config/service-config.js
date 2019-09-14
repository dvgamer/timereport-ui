const logger = require('@debuger')('SERVER')
const config = require('@config')

module.exports = async (req, res) => {
  try {
    const { segment } = req.params
    if (!segment) return res.status(404).end()
    res.json((await config(segment)))
  } catch (ex) {
    logger.error(ex)
  } finally {
    res.end()
  }
}
