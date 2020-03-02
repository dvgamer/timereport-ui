module.exports = auth => {
  if (!/^basic./ig.test(auth)) return {}
  try {
    auth = Buffer.from(auth.replace(/^basic./ig, ''), 'base64').toString('utf8')
    return /(?<user>.*?):(?<pass>.*)/ig.exec(auth).groups || {}
  } catch (ex) {
    return {}
  }
}
