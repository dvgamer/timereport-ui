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
//       { name: 'Inbound FTP', route: '/app/inbound-ftp', icon: 'file-alt' }
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
//     { name: 'Database', route: '/setting/database', icon: 'file-alt' }
//   ],
//   inspection: [
//     { name: 'Snippet', route: '/inspect/snippet', icon: 'hdd-o' },
//     { name: 'Terminal', route: '/inspect/terminal', icon: 'terminal' }
//   ]
// })
export const state = () => ({
  default: [
    { permission: 0, name: 'Dashboard', route: '/', icon: 'home', exact: true },
    { permission: 0, name: 'Survey', menu: 'survey', icon: 'bug', exact: true, api: '/api/survey/task' },
    // { permission: 3, name: 'Application', route: '/app', icon: 'bug', exact: true },
    { permission: 3, group: 'Service' },
    { permission: 3,name: 'Kafka Feed', route: '/app/kafka-feed', icon: 'tasks' },
    { permission: 3,name: 'Inbound FTP', route: '/app/inbound-ftp', icon: 'file-alt' },
    { permission: 4, group: 'SSIS' },
    { permission: 4,name: 'SSIS Staging', route: '/app/ssis-staging', icon: 'file-o' },
    { permission: 4, group: 'Schedule' },
    { permission: 4, name: 'File FCCR', route: '/app/file-fccr', icon: 'file-o' },
    { permission: 0, group: 'setting' },
    { permission: 3, name: 'Configuration', route: '/setting/configuration', icon: 'tasks' },
    { permission: 0, name: 'Audit', route: '/audit', icon: 'align-justify' }
  ],
  survey: [
    { permission: 0, name: 'Survey Dashboard', route: '/survey', icon: 'bug', exact: true }
  ]
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

export const mutations = {
  add (state, { menu, item }) {
    state[menu].push(item)
  }
}