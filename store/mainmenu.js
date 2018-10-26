export const state = () => ({
  default: [
    { permission: 0, name: 'Dashboard', route: '/', icon: 'fa fa-home' },
    { permission: 0, name: 'Inspection', menu: 'inspection', icon: 'fa fa-bug' },
    { permission: 1, name: 'Application', menu: 'application', icon: 'fa fa-tasks' },
    { permission: 2, name: 'Setting', menu: 'setting', icon: 'fa fa-gear' },
    { permission: 0, name: 'Audit', route: '/audit', icon: 'fa fa-align-justify' },
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
  ],
  inspection: [
    { name: 'Terminal', route: '/inspect/terminal', icon: 'fa fa-terminal' }
  ]
})

export const getters = {
  getMainMenu: (state, getters) => (path) => {
    let IsStop = false
    let sResult = 'default'
    let compare = (route) => {
      IsStop = route === path
      return IsStop
    }
    for (let key in state) {
      for (let i in state[key]) {
        if (compare(state[key][i].route)) {
          sResult = key
          break;
        } else if (state[key][i].items) {
          for (let l in state[key][i].items) {
            if (compare(state[key][i].items[l].route)) {
              sResult = key
              break;
            }
          }
        }
      }
      if (IsStop) break;
    }
    return sResult
  }
}
