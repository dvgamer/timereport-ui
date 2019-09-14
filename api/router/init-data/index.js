const mongo = require('@mongo')

const dbRemoveAllAndInsert = async (dbMongo, dataRows) => {
  await dbMongo.deleteMany()
  for (let i = 0; i < dataRows.length; i++) {
    const data = dataRows[i]
    await new dbMongo(data).save()
  }
}

module.exports = async () => {
  let { ServiceConfig, GlobalConfig } = await mongo.open()

  await dbRemoveAllAndInsert(GlobalConfig, require('./config-global'))
  await dbRemoveAllAndInsert(ServiceConfig, require('./config-service'))
  // await dbRemoveAllAndInsert(Snippet, require('./snippet'))
  // await dbRemoveAllAndInsert(PageSync, require('./page-sync'))
}
