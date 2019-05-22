const LINE = require('@line')
const aLog = require('../../log-services/log-mongo')

const getId = e => {
  if (!e || !e.source) return

  switch (e.source.type) {
    case 'user': return e.source.userId
    case 'group': return e.source.groupId
    case 'room': return e.source.roomId
  }
}
let jobEnabled = true
module.exports = async (req, res) => {
  let event = req.body
  let id = getId(event)
  if (!id || !event) return res.end()

  if (!jobEnabled) {
    await LINE('ris-sd3', { type: 'text', text: 'Reject, Someone is working on this.' }, event.replyToken)
    return res.end()
  }

  try {
    jobEnabled = false
    await LINE('ris-sd3', { type: 'text', text: 'Approved, Initialize...' }, id)
    aLog(0, 'monitor-task', 'line-bot', 'success', `Task 'Monitor DailyClose'.`)
    await LINE('ris-sd3', { type: 'text', text: 'Successfully.' }, id)
  } catch (ex) {
    aLog(0, 'monitor-task', 'line-bot', 'error', ex.stack || ex.message)
    await LINE('ris-sd3', { type: 'text', text: `Failure, ${ex.message || ex}.` }, id)
  } finally {
    jobEnabled = true
    return res.end()
  }
}
