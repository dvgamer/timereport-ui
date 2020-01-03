module.exports = {
  segment: { segment: 'main', field: 'mainmenu' },
  item: [
    { permission: 0, name: 'Overview', route: '/', icon: 'home', exact: true },
    { permission: 0, name: 'Checkup', route: '/checkup', icon: 'check-double' },
    { permission: 3, divider: 'POS CMG' },
    { permission: 3, name: 'BizTalk', route: '/cmgpos/biztalk', icon: 'tasks' },
    { permission: 3, name: 'Inbound Transfer', route: '/cmgpos/inbound-transfer', icon: 'tasks' },
    { permission: 3, name: 'SSIS Staging', route: '/cmgpos/ssis-staging', icon: 'server' },
    { permission: 4, divider: 'Management' },
    { permission: 4, name: 'Schedule', route: '/task/schedule', icon: 'terminal' },
    { permission: 4, name: 'Services', route: '/task/service', icon: 'terminal' },
    { permission: 4, name: 'Crontab', route: '/task/crontab', icon: 'terminal' },
    { permission: 4, name: 'PM2', route: '/task/pm2', icon: 'terminal' },
    { permission: 9, divider: 'Setting' },
    { permission: 9, name: 'Configuration', route: '/configuration', icon: 'cogs' },
    { permission: 9, name: 'Audit', route: '/audit', icon: 'align-justify' }
  ]
}
