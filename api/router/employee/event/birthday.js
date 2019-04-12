const logger = require('@debuger')('SERVER')
const mongo = require('@mongo')
const moment = require('moment')

module.exports = async (req, res) => {
  try {
    const day = moment('2019-09-30 00:00:00.000Z').date()
    const month = moment('2019-09-30 00:00:00.000Z').month() + 1
    const { Employee } = await mongo.open()
    let result = []
    for (const e of (await Employee.find({ resign: false }))) {
      if (!e.birthday) continue
      if (day === e.birthday.getDate() && month === e.birthday.getMonth() +  1) {
        result.push({
          employee_id: e.id,
          fullname_th: e.fullname_th,
          fullname_en: e.fullname_en,
          department: e.department,
          sex: e.sex
        })
      }
    }
    res.json(result)
  } catch (ex) {
    logger.error(ex)
  } finally {
    return res.end()
  }
}
