const mongo = require('@mongo')

const isNaNZero = (parseNumber, defaultNumber = 0) => {
  let digi = parseNumber ? parseInt(parseNumber) : defaultNumber
  return isNaN(digi) ? defaultNumber : digi
}

module.exports = async (req, res) => {
  try {
    let limit = 18
    let level = req.auth.user_level
    let page = isNaNZero(req.params.page, 1)
    const { ServiceLog } = await mongo.open()
    const pagination = { sort: { created: -1 }, skip: (page - 1) * limit, limit: limit }
    const filter = { permission: { $lte: level } }
    const audit = await ServiceLog.find(filter, null, pagination)
    res.json({ audit, total: await ServiceLog.find(filter).countDocuments(), limit })
  } catch (ex) {
    res.status(404)
  } finally {
    res.end()
  }
}
