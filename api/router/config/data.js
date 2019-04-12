const mongo = require('@mongo')

module.exports = async (segment) => {
  let conf = {}
  const { BotConfig } = await mongo.open()
  for (const data of (await BotConfig.find({ segment: segment }))) {
    conf[data.field] = data.value
  }
  return conf
}
