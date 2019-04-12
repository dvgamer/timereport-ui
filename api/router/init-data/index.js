const mongo = require('@mongo')

dbRemoveAllAndInsert = async (dbMongo, dataRows) => {
  await dbMongo.deleteMany()
  for (let i = 0; i < dataRows.length; i++) {
    const data = dataRows[i]
    await new dbMongo(data).save()
  }
}

module.exports = async () => {
  let { PageSync, Snippet, User, BotConfig, GlobalConfig } = await mongo.open()

  // await dbRemoveAllAndInsert(GlobalConfig, require('./global-config'))
  // await dbRemoveAllAndInsert(Snippet, require('./snippet'))
  // await dbRemoveAllAndInsert(PageSync, require('./page-sync'))
  await dbRemoveAllAndInsert(BotConfig, require('./bot-config'))
}
