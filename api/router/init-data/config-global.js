module.exports = [
  { segment: 'iis.service', field: 'ip48_in', type: 'string', created: new Date(), value: 'http://10.101.147.48/FTPWebService/Service1.asmx' },
  { segment: 'iis.service', field: 'ip49_in', type: 'string', created: new Date(), value: 'http://10.101.147.49/FTPWebService/Service1.asmx' },
  { segment: 'iis.service', field: 'ip51_in', type: 'string', created: new Date(), value: 'http://10.101.147.51/FTPWebService/Service1.asmx' },
  { segment: 'iis.service', field: 'ip48_out', type: 'string', created: new Date(), value: 'http://10.101.147.48/FTPWebService/Service2.asmx' },
  { segment: 'iis.service', field: 'ip49_out', type: 'string', created: new Date(), value: 'http://10.101.147.49/FTPWebService/Service2.asmx' },
  { segment: 'iis.service', field: 'ip51_out', type: 'string', created: new Date(), value: 'http://10.101.147.51/FTPWebService/Service2.asmx' },
  { segment: 'ftp.service', field: 'ip59_inbound', type: 'object', created: new Date(), value: { addr: '10.101.147.59', usr: 'postrans', pwd: 'P0strans' } },
  { segment: 'ftp.service', field: 'ip62_outbound', type: 'object', created: new Date(), value: { addr: '10.101.147.62', usr: '', pwd: '' } },
  { segment: 'database.posdb', field: 'rep', type: 'object', created: new Date(), value: {
    user: 'posquery',
    password: 'ycmgquer',
    server: 'posdbrep.cmg.co.th',
    database: 'POSDB',
    options: { encrypt: true }
  } }
]
