const db = require('../mongodb')

dbRemoveAllAndInsert = async (dbMongo, dataRows) => {
  await dbMongo.deleteMany()
  for (let i = 0; i < dataRows.length; i++) {
    const data = dataRows[i]
    await new dbMongo(data).save()
  }
}

module.exports = async () => {
  let { PageSync, Snippet } = await db.open()

  await dbRemoveAllAndInsert(Snippet, require('./snippet'))
  await dbRemoveAllAndInsert(PageSync, require('./page-sync'))
}
