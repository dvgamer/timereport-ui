module.exports = {
  segment: { field: 'mainmenu' },
  item: [
    { permission: 0, name: 'Overview', route: '/', icon: 'home', exact: true },
    { permission: 0, name: 'Checkup', route: '/checkup', icon: 'check-double' },
    {
      permission: 4,
      header: 'Inspection',
      group: {
        name: 'inspect',
        item: [
          { permission: 4, name: 'Coding', route: '/inspect/coding', icon: 'code' },
          { permission: 4, name: 'Result', route: '/inspect/terminal', icon: 'file-alt' },
        ]
      }
    },
    { permission: 2, divider: 'POS CMG' },
    { permission: 2, name: 'BizTalk', route: '/cmgpos/biztalk', icon: 'tasks' },
    { permission: 2, name: 'Inbound Transfer', route: '/cmgpos/inbound-transfer', icon: 'tasks' },
    { permission: 2, name: 'SSIS Staging', route: '/cmgpos/ssis-staging', icon: 'server' },
    { permission: 3, divider: 'Management' },
    { permission: 3, name: 'Schedule', route: '/task/schedule', icon: 'terminal', size: '1em' },
    { permission: 3, name: 'Services', route: '/task/service', icon: 'terminal', size: '1em' },
    { permission: 3, name: 'Crontab', route: '/task/crontab', icon: 'terminal', size: '1em' },
    { permission: 3, name: 'PM2', route: '/task/pm2', icon: 'terminal', size: '1em' },
    { permission: 5, divider: 'Setting' },
    { permission: 5, name: 'Configuration', route: '/configuration', icon: 'cogs' },
    { permission: 5, name: 'Audit', route: '/audit', icon: 'align-justify' }
  ]
}
