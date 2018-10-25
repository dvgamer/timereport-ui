export const state = () => ({
  default: [
    { permission: 0, name: 'Dashboard', route: '/', icon: 'fa fa-home' },
    { permission: 1, name: 'Application', route: '/app', menu: 'application', icon: 'fa fa-tasks' },
    { permission: 2, name: 'Setting', route: '/setting/configuration', menu: 'setting', icon: 'fa fa-gear' },
    { permission: 1, name: 'Audit', route: '/audit', icon: 'fa fa-align-justify' },
  ],
  application: [
    { name: 'Dashboard', route: '/app', icon: 'fa fa-home' },
    { group: 'Service', items: [
      { name: 'Kafka Feed', route: '/app/kafka-feed', icon: 'fa fa-tasks' },
      { name: 'Inbound Transfer', route: '/app/inbound-transfer', icon: 'fa fa-file-text-o' }
    ] },
    { group: 'SSIS', items: [
      { name: 'SSIS Staging', route: '/app/ssis-staging', icon: 'fa fa-file-o' },
    ] },
    { group: 'Schedule', items: [
      { name: 'File FCCR', route: '/app/file-fccr', icon: 'fa fa-file-o' }
    ] }
  ],
  setting: [
    { name: 'Configuration', route: '/setting/configuration', icon: 'fa fa-tasks' },
    { name: 'Database', route: '/setting/database', icon: 'fa fa-file-text-o' }
  ]
})
