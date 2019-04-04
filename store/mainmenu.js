// permission 0=guest, 1=user, 2=programmer, 3=admin

// export const state = () => ({
//   default: [
//     { permission: 0, name: 'Dashboard', route: '/', icon: 'home', exact: true },
//     { permission: 2, name: 'Inspection', menu: 'inspection', icon: 'bug' },
//     { permission: 1, name: 'Application', menu: 'application', icon: 'tasks' },
//     { permission: 3, name: 'Setting', menu: 'setting', icon: 'gear' },
//     { permission: 0, name: 'Audit', route: '/audit', icon: 'align-justify' },
//   ],
//   application: [
//     { name: 'Dashboard', route: '/app', icon: 'home', exact: true },
//     { group: 'Service', items: [
//       { name: 'Kafka Feed', route: '/app/kafka-feed', icon: 'tasks' },
//       { name: 'Inbound FTP', route: '/app/inbound-ftp', icon: 'file-text-o' }
//     ] },
//     { group: 'SSIS', items: [
//       { name: 'SSIS Staging', route: '/app/ssis-staging', icon: 'file-o' },
//     ] },
//     { group: 'Schedule', items: [
//       { name: 'File FCCR', route: '/app/file-fccr', icon: 'file-o' }
//     ] }
//   ],
//   setting: [
//     { name: 'Configuration', route: '/setting/configuration', icon: 'tasks' },
//     { name: 'Database', route: '/setting/database', icon: 'file-text-o' }
//   ],
//   inspection: [
//     { name: 'Snippet', route: '/inspect/snippet', icon: 'hdd-o' },
//     { name: 'Terminal', route: '/inspect/terminal', icon: 'terminal' }
//   ]
// })
export const state = () => ({
  default: [
    { permission: 0, name: 'Dashboard', route: '/', icon: 'home', exact: true },
    { permission: 0, name: 'Survey', menu: 'survey', icon: 'bug', exact: true },
    // { permission: 3, name: 'Application', route: '/app', icon: 'bug', exact: true },
    { permission: 3, group: 'Service', items: [
      { name: 'Kafka Feed', route: '/app/kafka-feed', icon: 'tasks' },
      { name: 'Inbound FTP', route: '/app/inbound-ftp', icon: 'file-text-o' }
    ] },
    { permission: 4, group: 'SSIS', items: [
      { name: 'SSIS Staging', route: '/app/ssis-staging', icon: 'file-o' },
    ] },
    { permission: 4, group: 'Schedule', items: [
      { name: 'File FCCR', route: '/app/file-fccr', icon: 'file-o' }
    ] },
    { permission: 0, group: 'setting', items: [
      { permission: 3, name: 'Configuration', route: '/setting/configuration', icon: 'tasks' },
      { permission: 0, name: 'Audit', route: '/audit', icon: 'align-justify' }
    ] }
  ],
  survey: [
    { name: 'Dashboard', route: '/survey', icon: 'bug', exact: true },
    { name: 'History', route: '/survey/history', icon: 'server', exact: true }
  ],
})
export const getters = {
  getMainMenu: (state, getters) => (path) => {
    let IsStop = false
    let sResult = 'default'
    let compare = (menu) => {
      IsStop = menu.route === path || (!menu.exact && path.includes(menu.route))
      return IsStop
    }
    for (let key in state) {
      for (let i in state[key]) {
        if (compare(state[key][i])) {
          sResult = key
          break;
        } else if (state[key][i].items) {
          for (let l in state[key][i].items) {
            if (compare(state[key][i].items[l])) {
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
