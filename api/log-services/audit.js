const mongo = require('@mongo')

const isNaNZero = (parseNumber, defaultNumber = 0) => {
  let digi = parseNumber ? parseInt(parseNumber) : defaultNumber
  return isNaN(digi) ? defaultNumber : digi
}

module.exports = async (req, res) => {
  try {
    let limit = 18
    let level = isNaNZero(req.body.level)
    let page = isNaNZero(req.params.page, 1)
    const { ServiceLog } = await mongo.open()
    const pagination = { sort: { created: -1 }, skip: (page - 1) * limit, limit: limit }
    const audit = await ServiceLog.find({ permission: { $lte: level } }, null, pagination)
    res.json({ audit, total: await ServiceLog.countDocuments(), limit })
  } catch (ex) {
    console.log(ex)
    res.status(404)
  } finally {
    res.end()
  }
}
