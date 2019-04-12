const mongo = require('@mongo')

module.exports = async (segment) => {
  let conf = {}
  const { ServiceConfig } = await mongo.open()
  for (const data of (await ServiceConfig.find({ segment: segment }))) {
    conf[data.field] = data.value
  }
  return conf
}
