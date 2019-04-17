const mongo = require('@mongo')

module.exports = async (segment) => {
  let conf = {}
  const { GlobalConfig } = await mongo.open()
  for (const data of (await GlobalConfig.find({ segment: segment }))) {
    conf[data.field] = data.value
  }
  return conf
}
