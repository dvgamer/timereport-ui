module.exports = [
  { segment: 'service.bot', field: 'proxy', created: new Date(), value: 'http://s-thcw-posweb01.pos.cmg.co.th:3000' },
  { segment: 'service.bot', field: 'endpoint', created: new Date(), value: 'http://s-thcw-posdb95.pos.cmg.co.th/api' },
  { segment: 'service.bot', field: 'birthday-line', created: new Date(), value: {
    crontab: '0 8 * * *',
    botname: 'gamgoum',
    room: 'U23d0cfb62986804cbacdf63398aef4cf',
  } },
  { segment: 'database.posdb', field: 'rep', created: new Date(), value: {
    user: 'posquery',
    password: 'ycmgquer',
    server: 'posdbrep.cmg.co.th',
    database: 'POSDB',
    options: { encrypt: true }
  } },
]
