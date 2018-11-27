const db = require('../mongodb')

dbRemoveAllAndInsert = async (dbMongo, dataRows) => {
  await dbMongo.deleteMany()
  for (let i = 0; i < dataRows.length; i++) {
    const data = dataRows[i]
    await new dbMongo(data).save()
  }
}

module.exports = async () => {
  let { PageSync, Snippet, User, UserHistory, GlobalConfig } = await db.open()

  // permission
  // - system,admin,analyst,developer,user
  await UserHistory.deleteMany()
  // await User.deleteMany()
  // await new User({
  //   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYXNoIjoiNWY4MjhiN2FjMzRmYjY1MjYyNjY4ZTMzMWI1OWM4OTkiLCJfaWQiOiI1YmY3ZDA5MjRiYWZiMTIzNWM3NzNlYzciLCJtYWlsIjoidGhrYW5hbmVrQGNlbnRyYWwuY28udGgiLCJhY3RpdmUiOmZhbHNlLCJpYXQiOjE1NDI5NzA5MDZ9.kTzmj9RuE8X4zX2dPq-L--kNcpHmkLVMJmmunpHfaxs',
  //   activate: false,
  //   enabled: false,
  //   lasted: new Date(),
  //   updated: new Date(),
  //   created: new Date(),
  //   permission: 'system',
  //   title: 'Senior Programmer',
  //   company: 'Terasoft Solutions Development Co.,Ltd.',
  //   department: 'แผนกระบบงาน POS',
  //   office_name: 'CENTRAL SILOM',
  //   description: 'HQ#DM#19/01/2018#Rungnapa A.',
  //   name: 'Kananek Thongkam',
  //   mail: 'thkananek@central.co.th',
  //   display_name: 'Kananek Thongkam',
  //   telephone_no: '097-034-7607',
  //   user_name: 'ThKanane',
  //   user_type: '805306368',
  //   pwd: '64aec91f181411454aafe47fc38777c0'
  // }).save()


  await dbRemoveAllAndInsert(GlobalConfig, require('./global-config'))

  await dbRemoveAllAndInsert(Snippet, require('./snippet'))
  await dbRemoveAllAndInsert(PageSync, require('./page-sync'))
}
