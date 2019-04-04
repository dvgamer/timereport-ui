const logger = require('@debuger')('LINE')
const request = require('request-promise')
// Import and Set Nuxt.js options
const NOTI_PROXY = process.env.NOTI_PROXY || 'http://10.101.147.48:3000'
module.exports = async (bot, body, api = 'C4af566ba4cf77cbc04dd1eff2f3bda38') => {
  await request({ method: 'PUT', url: `${NOTI_PROXY}/${bot}/${api}`, body, json: true })
  logger.info(`Push ${bot} FlexMessage.`)
}
