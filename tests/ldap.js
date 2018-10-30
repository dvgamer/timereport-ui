const ldap = require('ldapjs')

// LDAP Connection Settings
const server = 'central.co.th'
const adSuffix = 'dc=central,dc=co,dc=th'
const timeout = 5000

const username = ('thkananek@central.co.th').replace(/[\()!#$%^&]/ig, '').trim()
const password = 'asdasd2'
// Create client and bind to AD
const client = ldap.createClient({
  url: `ldap://${server}`,
  baseDN: adSuffix,
  timeout: timeout,
  connectTimeout: timeout,
  idleTimeout: timeout * 5
})

client.bind(username, password, err => {
  console.log(`login: ${username}:${password} -- `, !err)
  // Search AD for user
  const searchOptions = { scope: 'sub', filter: `(|(sAMAccountName=${username})(userPrincipalName=${username}))` }
  client.search(adSuffix, searchOptions, (err, res) => {
    console.log('search:', !err)
    // Wrap up
  
    res.on('searchEntry', entry => {
      let user = entry.object
      console.log(`
                     title: ${user.title}
                   company: ${user.company}
                department: ${user.department}
               description: ${user.description}
physicalDeliveryOfficeName: ${user.physicalDeliveryOfficeName}
                      name: ${user.name}
               displayName: ${user.displayName}
                      mail: ${user.mail}
            sAMAccountName: ${user.sAMAccountName}
            sAMAccountType: ${user.sAMAccountType}
         userPrincipalName: ${user.userPrincipalName}
           telephoneNumber: ${user.telephoneNumber}
`)
    })
    res.on('error', err => {
      console.error('error: ' + err.message)
      client.unbind(err => console.log('unbind:', !err))
    })
    res.on('end', () => {
      client.unbind(err => console.log('unbind:', !err))
    })

  })
})
