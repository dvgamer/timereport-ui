module.exports = [
  { permission: 0, name: 'Dashboard', route: '/', icon: 'home', exact: true },
  { permission: 0, name: 'Checkup', route: '/checkup', icon: 'home' },
  { permission: 3, divider: 'POS CMG' },
  { permission: 3, name: 'SSIS Staging', route: '/app/ssis-staging', icon: 'file-o' },
  { permission: 3, name: 'Inbound FTP', route: '/app/inbound-ftp', icon: 'file-alt' },
  { permission: 2, divider: 'Management' },
  { permission: 2, name: 'Schedule', route: '/task/schedule', icon: 'file-o' },
  { permission: 2, name: 'Services', route: '/task/service', icon: 'file-o' },
  { permission: 2, name: 'Crontab', route: '/task/crontab', icon: 'file-o' },
  { permission: 2, name: 'PM2', route: '/task/pm2', icon: 'file-o' },
  { permission: 1, divider: 'Setting' },
  { permission: 1, name: 'Configuration', route: '/configuration', icon: 'tasks' },
  { permission: 1, name: 'Audit', route: '/audit', icon: 'align-justify' }
]
