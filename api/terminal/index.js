const { Router } = require('express')
const db = require('../mongodb')
const router = Router()
const fs = require('fs')
const fx = require('mkdir-recursive')
const path = require('path')
const simpleGit = require('simple-git/promise')

const repositories = process.env.GIT_REPOS || './tmp'
const project = path.resolve(path.join(repositories, 'app_terminal.git'))
if (!fs.existsSync(project)) fx.mkdirSync(project)

router.get('/', (req, res) => (async () => {
  res.json({ })
})().catch((ex) => {
  res.json({ error: ex.message, stack: ex.stack })
}))

router.get('/snippet', (req, res) => (async () => {
  let { Snippet } = await db.open()
  
  await new Snippet({
    title: 'Checking IIS Inbound Services',
    file: 'iis-services.ps1',
    task: 'inbound-checking',
    user: 'thkanane',
    avatar: 'https://avatars.dicebear.com/v2/male/thkanane.svg',
    private: false,
    mode: 'powershell',
    content:
`# service url online check inbound (http://posgateway.cmg.co.th/FTPWebService/service1.asmx)
$in48 = 'http://10.101.147.48/FTPWebService/Service1.asmx'
$in49 = 'http://10.101.147.49/FTPWebService/Service1.asmx'
$in51 = 'http://10.101.147.51/FTPWebService/Service1.asmx'
$out48 = 'http://10.101.147.51/FTPWebService/Service2.asmx'
$out49 = 'http://10.101.147.48/FTPWebService/Service2.asmx'
$out51 = 'http://10.101.147.49/FTPWebService/Service2.asmx'

$Time = [System.Diagnostics.Stopwatch]::StartNew()

Write-Host "\`n Checking IIS Services" -ForegroundColor Blue
foreach ($req in @($in48,$in49,$in51,$out48,$out49,$out51)) {
  Write-Host " - IIS Web: " -NoNewline;
  Write-Host $req -ForegroundColor Gray -NoNewline;
  try {
    $res = Invoke-WebRequest -Uri $req -UseBasicParsing | Select-Object -ExpandProperty StatusCode;
    Write-Host ", StatusCode: "-NoNewline;
    Write-Host $res -ForegroundColor Green;
    $color = "Green";
  } catch {
    Write-Host ", StatusCode: " -NoNewline;
    Write-Host 404 -ForegroundColor Red;
    Write-Host "   " -NoNewline;
    Write-Host $_.Exception.Message -ForegroundColor Red;
    Write-Host ""
  }
}

Write-Host "\`n   " -NoNewline;
Write-Host $([string]::Format("(elapsed: {0:d2}:{1:d2})", $($Time.Elapsed).minutes, $($Time.Elapsed).seconds))`,
    updated: new Date,
    created: new Date
  }).save()
  
  let data = await Snippet.find({})
  console.log(data)
  // console.log('git:', project)
  // const git = simpleGit(project)

  // const isRepo = await git.checkIsRepo()
  // if (!isRepo) await git.init(true)
  res.json({ })
})().catch((ex) => {
  res.json({ error: ex.message, stack: ex.stack })
}))
// /* GET user by ID. */
// router.get('/inbound-transfer/:id', function (req, res, next) {
//   const id = parseInt(req.params.id)
//   if (id >= 0 && id < users.length) {
//     res.json(users[id])
//   } else {
//     res.sendStatus(404)
//   }
// })

module.exports = router
