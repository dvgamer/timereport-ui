const mongo = require('@mongo')

module.exports = async (permission, app, group, status, message) => {
  const { ServiceLog } = await mongo.open()
  new ServiceLog({ app, group, status, message, created: new Date(), permission }).save()
}
