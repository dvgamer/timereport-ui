const { createClient } = require('ldapjs')

// LDAP Connection Settings
const name = process.env.LDAP_NAME || 'central'
const server = process.env.LDAP_SERVER_NAME || `${name}.co.th`
const adSuffix = process.env.LDAP_SUFFIX || `OU=RIS,OU=UsersAccount,DC=${name},DC=co,DC=th`
const timeout = process.env.LDAP_TIMEOUT || 30000

if (!server || !adSuffix) throw new Error('LDAP connection settings not found!')

module.exports = async (usr, pwd, filter) => {
  if (!usr || !pwd) throw new Error('Username or Passoword is empty!')

  const username = usr.trim()
  const password = pwd.trim()
  const searchOptions = usr => ({ scope: 'sub', filter: filter || (!/@/g.test(usr) ? `(sAMAccountName=${usr})` : `(userPrincipalName=${usr})`) })

  // Create client and bind to AD
  let data = null
  try {
    const asyncClient = () => new Promise((resolve, reject) => {
      const client = createClient({
        url: `ldap://${server}`,
        baseDN: adSuffix,
        timeout: timeout,
        connectTimeout: timeout,
        idleTimeout: timeout
      })

      client.on('error', (err, res) => {
        if (err) return reject(err)
        return resolve(client)
      })
    })

    const asyncBind = (usr, pwd) => new Promise((resolve, reject) => {
      const rejectBind = ex => {
        client.unbind(err => {
          ex = err || ex.lde_message || ex
          // logger.warning('asyncBind-unbind:', ex)
          reject(ex)
        })
      }
      const manualTimeout = setTimeout(() => {
        rejectBind('client bind is timeout.')
      }, timeout)

      // logger.info('bind:', usr, pwd)
      client.bind(usr, pwd, err => {
        clearTimeout(manualTimeout)
        if (err) return rejectBind(err)
        resolve()
      })
    })

    const asyncSearch = (suffix, options) => new Promise((resolve, reject) => {
      const resolveBind = (data) => client.unbind(err => {
        // logger.warning('resolve-unbind:', !err)
        if (err) return reject(err)
        resolve(data)
      })
      const rejectBind = (ex) => client.unbind(err => {
        // logger.warning('reject-unbind:', !err)
        reject(err || ex)
      })

      // logger.info(' - search-begin:', options.filter)
      client.search(suffix, options, (err, res) => {
        if (err) return rejectBind(err.message)

        const result = []
        let resultTimeout = null
        res.on('searchEntry', entry => {
          // logger.info('search-entry:', !!entry)
          const user = entry.object
          const output = {
            title: user.title,
            company: user.company,
            department: user.department,
            office_name: user.physicalDeliveryOfficeName,
            description: user.description,
            employee_id: user.extensionAttribute1,
            name: user.name,
            mail: user.mail,
            display_name: user.displayName,
            telephone_no: user.telephoneNumber,
            user_name: user.sAMAccountName,
            user_type: user.sAMAccountType
          }
          if (!filter) {
            return resolveBind(output)
          } else {
            result.push(output)
            if (resultTimeout) clearTimeout(resultTimeout)
            resultTimeout = setTimeout(() => resolveBind(result), 2000)
          }
        })

        if (filter) {
          res.on('search-end', () => {
            // logger.success(' - search-end:', !!entry)
            return resolveBind()
          })
        }

        res.on('search-error', err => {
          // logger.error(' - search-error:', !err)
          return rejectBind(err)
        })
      })
    })

    const client = await asyncClient()
    const isADUser = !/@/g.test(username)
    let account = isADUser ? `${name}\\${username}` : username
    try {
      await asyncBind(account, password)
      data = await asyncSearch(adSuffix, searchOptions(username))
      // logger.success('search entry: pass.')
    } catch (ex) {
      // logger.error('bind: fail, ', ex.message || ex)
      data = ex.message || ex
    }
    if (isADUser) {
      account = `${username}@${server}`
      await asyncBind(account, password)
      data = await asyncSearch(adSuffix, searchOptions(account))
    }
  } catch (ex) {
    data = ex.message || ex
  }
  return data
}
