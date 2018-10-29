module.exports = [
  {
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
  },
  {
    title: 'Checking IIS Inbound Services',
    file: 'iis-services.ps1',
    task: 'inbound-checking',
    user: 'thkanane',
    avatar: 'https://avatars.dicebear.com/v2/male/thkanane.svg',
    private: false,
    mode: 'powershell',
    content: `echo TEST %DATE%`,
    updated: new Date,
    created: new Date
  },
  {
    title: 'Checking IIS Inbound Services',
    file: 'iis-services.ps1',
    task: 'inbound-checking',
    user: 'thkanane',
    avatar: 'https://avatars.dicebear.com/v2/male/thkanane.svg',
    private: false,
    mode: 'powershell',
    content: `echo TEST %DATE%`,
    updated: new Date,
    created: new Date
  },
  {
    title: 'Checking IIS Inbound Services',
    file: 'iis-services.ps1',
    task: 'inbound-checking',
    user: 'thkanane',
    avatar: 'https://avatars.dicebear.com/v2/male/thkanane.svg',
    private: false,
    mode: 'powershell',
    content: `echo TEST %DATE%`,
    updated: new Date,
    created: new Date
  },
  {
    title: 'Checking IIS Inbound Services',
    file: 'iis-services.ps1',
    task: 'inbound-checking',
    user: 'thkanane',
    avatar: 'https://avatars.dicebear.com/v2/male/thkanane.svg',
    private: false,
    mode: 'powershell',
    content: `echo TEST %DATE%`,
    updated: new Date,
    created: new Date
  },
  {
    title: 'Checking IIS Inbound Services',
    file: 'iis-services.ps1',
    task: 'inbound-checking',
    user: 'thkanane',
    avatar: 'https://avatars.dicebear.com/v2/male/thkanane.svg',
    private: false,
    mode: 'powershell',
    content: `echo TEST %DATE%`,
    updated: new Date,
    created: new Date
  },
  {
    title: 'Checking IIS Inbound Services',
    file: 'iis-services.ps1',
    task: 'inbound-checking',
    user: 'thkanane',
    avatar: 'https://avatars.dicebear.com/v2/male/thkanane.svg',
    private: false,
    mode: 'powershell',
    content: `echo TEST %DATE%`,
    updated: new Date,
    created: new Date
  },
  {
    title: 'Checking IIS Inbound Services',
    file: 'iis-services.ps1',
    task: 'inbound-checking',
    user: 'thkanane',
    avatar: 'https://avatars.dicebear.com/v2/male/thkanane.svg',
    private: false,
    mode: 'powershell',
    content: `echo TEST %DATE%`,
    updated: new Date,
    created: new Date
  },
  {
    title: 'Checking IIS Inbound Services',
    file: 'iis-services.ps1',
    task: 'inbound-checking',
    user: 'thkanane',
    avatar: 'https://avatars.dicebear.com/v2/male/thkanane.svg',
    private: false,
    mode: 'powershell',
    content: `echo TEST %DATE%`,
    updated: new Date,
    created: new Date
  },
  {
    title: 'Checking IIS Inbound Services',
    file: 'iis-services.ps1',
    task: 'inbound-checking',
    user: 'thkanane',
    avatar: 'https://avatars.dicebear.com/v2/male/thkanane.svg',
    private: false,
    mode: 'powershell',
    content: `echo TEST %DATE%`,
    updated: new Date,
    created: new Date
  },
  {
    title: 'Checking IIS Inbound Services',
    file: 'iis-services.ps1',
    task: 'inbound-checking',
    user: 'thkanane',
    avatar: 'https://avatars.dicebear.com/v2/male/thkanane.svg',
    private: false,
    mode: 'powershell',
    content: `echo TEST %DATE%`,
    updated: new Date,
    created: new Date
  }
]