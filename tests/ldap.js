const ldapAuth = require('../api/authication/ldap')
const mongo = require('../api/mongodb')
let emp = [
  {id:'4006451',sex:'male',fullname_th:'อดิสรณ์ คำภาส',birthday:'1978-08-25'},
  {id:'14007918',sex:'female',fullname_th:'ศิริรัตน์ นาคนาเกร็ด',birthday:'1981-06-17'},
  {id:'5005273',sex:'male',fullname_th:'พิรพล ปัญญาชาญสิริ',birthday:'1978-10-03'},
  {id:'5009972',sex:'male',fullname_th:'อวิรุทธ์ เอกโชติกุล',birthday:'1982-01-27'},
  {id:'11062429',sex:'male',fullname_th:'อภิชัย สุขชัยศรี',birthday:'1982-12-11'},
  {id:'11062430',sex:'male',fullname_th:'ธนากร จงสัมฤทธิ์เมธี',birthday:'1983-02-09'},
  {id:'18011163',sex:'female',fullname_th:'สุวรรณี ปลั่งประดิษฐ์',birthday:'1989-06-17'},
  {id:'18011582',sex:'male',fullname_th:'ศุภณัฐ สมควร',birthday:'1988-07-27'},
  {id:'9804890',sex:'male',fullname_th:'กอบชัย สายสิงห์ทอง',birthday:'1981-08-09'},
  {id:'16006882',sex:'female',fullname_th:'เจนจิรา ทิพย์อำไพกุล',birthday:'1987-01-17'},
  {id:'95001557',sex:'female',fullname_th:'อารีย์ มากท่าไม้',birthday:'1973-01-21'},
  {id:'96001456',sex:'male',fullname_th:'กิตติ เภตราพรโชติ',birthday:'1962-01-01'},
  {id:'99051686',sex:'male',fullname_th:'ศาสตรา สาพิมาน',birthday:'1973-11-23'},
  {id:'14008509',sex:'female',fullname_th:'จริยา ลามอ',birthday:'1977-07-22'},
  {id:'7000046',sex:'male',fullname_th:'ฉัตรชัย กรเกียรติกำจร',birthday:'1975-11-10'},
  {id:'95001551',sex:'female',fullname_th:'อุไรวรรณ กาฬสิงห์',birthday:'1968-04-02'},
  {id:'95001559',sex:'male',fullname_th:'รพีพัฒน์ เลปนะวัฒน์',birthday:'1972-03-29'},
  {id:'2003420',sex:'male',fullname_th:'ปริญญา ถานันดร',birthday:'1979-05-22'},
  {id:'4003133',sex:'male',fullname_th:'รุ่งสุริยา มูลสาร',birthday:'1979-11-01'},
  {id:'17004313',sex:'female',fullname_th:'อัปสร บุปผากัณฑ์',birthday:'1993-03-21'},
  {id:'18006925',sex:'male',fullname_th:'ปิยบุญ คุณากรจิตติรักษ์',birthday:'1994-03-17'},
  {id:'5007220',sex:'male',fullname_th:'อภินันท์ อุทาจันทร์',birthday:'1971-02-16'},
  {id:'16015210',sex:'female',fullname_th:'นลินี อรุณศักดิ์',birthday:'1982-05-13'},
  {id:'8002327',sex:'male',fullname_th:'อนุสิทฎ์ ประมงวัฒนา',birthday:'1979-07-12'},
  {id:'17011023',sex:'female',fullname_th:'พีรดา สิงห์ตาก้อง',birthday:'1986-01-21'},
  {id:'15019835',sex:'female',fullname_th:'จินดารัตน์ สารเก่ง',birthday:'1984-12-30'},
  {id:'6001852',sex:'male',fullname_th:'ธนกร ศุภนามัย',birthday:'1970-06-01'},
  {id:'17001838',sex:'male',fullname_th:'ณัฐวุฒิ แสวงหาทรัพย์',birthday:'1991-04-17'},
  {id:'17016479',sex:'male',fullname_th:'คทาวุธ พรมเต็ม',birthday:'1989-12-02'},
  {id:'18002457',sex:'female',fullname_th:'อนุวดี เทียมทัน',birthday:'1991-08-14'},
  {id:'18002717',sex:'female',fullname_th:'พิชานัน ต่อสกุล',birthday:'1991-07-16'},
  {id:'17011096',sex:'male',fullname_th:'พรมงคล ฉิมมาลี',birthday:'1989-04-24'},
  {id:'18000922',sex:'male',fullname_th:'กัณฑ์อเนก ทองคำ',birthday:'1988-09-30'},
  {id:'8002337',sex:'female',fullname_th:'หนึ่งฤทัย เอี่ยมสำอางค์',birthday:'1970-07-28'}
]

let main = async () => {
  const { Employee } = await mongo.open()
  console.log('delete many')
  await Employee.deleteMany({ id: { $ne: null} })
  console.log('begin')
  for (const e of emp) {
    let data = await ldapAuth('thkanane', 'asdasd4', `(extensionAttribute1=*${e.id})`)
    let [ ldap ] = data
    await new Employee({
      id: e.id,
      fullname_th: e.fullname_th,
      fullname_en: ldap.display_name,
      department: ldap.department,
      sex: e.sex,
      birthday: new Date(e.birthday),
      resign: false,
      created: new Date()
    }).save()
  }
  console.log('finish')
}

main()

