
module.exports = [
  { segment: 'server.reboot_data-sync', field: 'toggle', type: 'bool', created: new Date(), value: true },
  { segment: 'server.reboot_data-sync', field: 'rebooted', type: 'date', created: new Date(), value: null },
  { segment: 'iis_service_url', field: 'ip48_in', type: 'string', created: new Date(), value: 'http://10.101.147.48/FTPWebService/Service1.asmx' },
  { segment: 'iis_service_url', field: 'ip49_in', type: 'string', created: new Date(), value: 'http://10.101.147.49/FTPWebService/Service1.asmx' },
  { segment: 'iis_service_url', field: 'ip51_in', type: 'string', created: new Date(), value: 'http://10.101.147.51/FTPWebService/Service1.asmx' },
  { segment: 'iis_service_url', field: 'ip48_out', type: 'string', created: new Date(), value: 'http://10.101.147.48/FTPWebService/Service2.asmx' },
  { segment: 'iis_service_url', field: 'ip49_out', type: 'string', created: new Date(), value: 'http://10.101.147.49/FTPWebService/Service2.asmx' },
  { segment: 'iis_service_url', field: 'ip51_out', type: 'string', created: new Date(), value: 'http://10.101.147.51/FTPWebService/Service2.asmx' },
  { segment: 'ftp_service_addr', field: 'ip59_inbound', type: 'string', created: new Date(), value: '10.101.147.59' },
  { segment: 'ftp_service_addr', field: 'ip62_outbound', type: 'string', created: new Date(), value: '10.101.147.62' },
  { segment: 'ftp_account.ip59_inbound', field: 'usr', type: 'string', created: new Date(), value: 'postrans' },
  { segment: 'ftp_account.ip59_inbound', field: 'pwd', type: 'string', created: new Date(), value: 'P0strans' },
  { segment: 'ftp_account.ip62_outbound', field: 'usr', type: 'string', created: new Date(), value: '' },
  { segment: 'ftp_account.ip62_outbound', field: 'pwd', type: 'string', created: new Date(), value: '' }
]
