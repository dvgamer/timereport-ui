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
    title: 'Checking FTP Services',
    file: 'ftp-connection.ps1',
    task: 'inbound-checking',
    user: 'thkanane',
    avatar: 'https://avatars.dicebear.com/v2/male/thkanane.svg',
    private: false,
    mode: 'powershell',
    content: 
`$IP42 = '10.101.147.42'
$IP43 = '10.101.147.43'
$IP44 = '10.101.147.44'

#Server IP
$IP46 = '10.101.147.46'
$IP47 = '10.101.147.47'

$IP48 = '10.101.147.48'
$IP49 = '10.101.147.49'

$IP50 = '10.101.147.50'
$IP51 = '10.101.147.51'

$IP54 = '10.101.147.54'
$IP55 = '10.101.147.55'
$IP56 = '10.101.147.56'
$IP59 = '10.101.147.59'

$IP62 = '10.101.147.62'
$IP69 = '10.101.147.69'
$IP70 = '10.101.147.70'

$Time = [System.Diagnostics.Stopwatch]::StartNew()

Write-Host "\`n Checking FTP Services " -ForegroundColor Blue
try {
  $ftprequest = [System.Net.FtpWebRequest]::Create("ftp://$IP59")
  $ftprequest.Credentials = New-Object System.Net.NetworkCredential("postrans", "P0strans") 
  $ftprequest.Method = [System.Net.WebRequestMethods+Ftp]::PrintWorkingDirectory
  $ftprequest.Timeout = 2000;
  Write-Host " - FTP $IP59, Login: " -NoNewline;
  Write-Host $($ftprequest.GetResponse() | Select-Object WelcomeMessage).WelcomeMessage -ForegroundColor Green -NoNewline;
} catch {
  Write-Host " - FTP $IP59, Login: " -NoNewline;
  Write-Host "Fail." -ForegroundColor Red;
  Write-Host "   " -NoNewline;
  Write-Host $_.Exception.Message -ForegroundColor Red
}

try {
  $ftprequest = [System.Net.FtpWebRequest]::Create("ftp://$IP62")
  $ftprequest.Method = [System.Net.WebRequestMethods+Ftp]::PrintWorkingDirectory
  $ftprequest.Timeout = 10000;
  Write-Host " - FTP $IP62, Login: " -NoNewline;
  Write-Host $($ftprequest.GetResponse() | Select-Object WelcomeMessage).WelcomeMessage -ForegroundColor Green -NoNewline;
} catch {
  Write-Host "Fail, $($_.Exception.Message)" -ForegroundColor Red
}


Write-Host "\`n   " -NoNewline;
Write-Host $([string]::Format("(elapsed: {0:d2}:{1:d2})", $($Time.Elapsed).minutes, $($Time.Elapsed).seconds))`,
    updated: new Date,
    created: new Date
  },
  {
    title: 'Checking TXN POSGW to POSDB',
    file: 'posgw-posdb.ps1',
    task: 'inbound-checking',
    user: 'thkanane',
    avatar: 'https://avatars.dicebear.com/v2/male/thkanane.svg',
    private: false,
    mode: 'powershell',
    content:
`$Time = [System.Diagnostics.Stopwatch]::StartNew()

$srv = 'posdbrep.cmg.co.th'; $usr = 'posquery'; $pwd = 'ycmgquer';

Write-Host "\`n Checking POSGW file and POSDB TXN Count" -ForegroundColor Blue
$result = $(sqlcmd.exe -s "|" -W -h -1 -U $usr -P $pwd -S $srv -Q @"
  SET NOCOUNT ON;
  SELECT 
    'Already get file from Client ('+ LEFT(CONVERT(NVARCHAR(8),DATEADD(HOUR, -1, GETDATE()), 108), 5) + ' - ' + LEFT(CONVERT(NVARCHAR(8),GETDATE(), 108), 5) + ')', 
    COUNT(1)
  FROM POSGW.dbo.TLTransUp WITH(NOLOCK) 
  WHERE nStartDate = CONVERT(NVARCHAR(8),GETDATE(), 112) 
    AND nStartTime BETWEEN REPLACE(LEFT(CONVERT(NVARCHAR(8),DATEADD(HOUR, -1, GETDATE()), 108), 5),':','') + '00' 
    AND REPLACE(LEFT(CONVERT(NVARCHAR(8),GETDATE(), 108), 5),':','') + '00' AND sStatus = 0
"@)
Write-Host " - POSGW $($result.Split('|')[0]), Count: " -NoNewline; 
Write-Host $([int]$result.Split('|')[1]) -ForegroundColor $(if([int]$($result.Split('|')[1]) -eq 0) { 'Red' } else { 'Green' });

$result = $(sqlcmd.exe -s "|" -W -h -1 -U $usr -P $pwd -S $srv -Q @"
  SET NOCOUNT ON;
  SELECT 
    'Wait to decompress ZIP to XML ('+ LEFT(CONVERT(NVARCHAR(8),DATEADD(HOUR, -1, GETDATE()), 108), 5) + ' - ' + LEFT(CONVERT(NVARCHAR(8),GETDATE(), 108), 5) + ')', COUNT(1)
  FROM POSGW.dbo.TLTransUp WITH(NOLOCK) 
  WHERE  nStartDate = CONVERT(NVARCHAR(8),GETDATE(), 112) 
    AND nStartTime BETWEEN REPLACE(LEFT(CONVERT(NVARCHAR(8),DATEADD(HOUR, -1, GETDATE()), 108), 5),':','') + '00' 
    AND REPLACE(LEFT(CONVERT(NVARCHAR(8),GETDATE(), 108), 5),':','') + '00' 
    AND sStatus = 3
"@)
Write-Host " - POSGW $($result.Split('|')[0]), Count: " -NoNewline; 
Write-Host $([int]$result.Split('|')[1]) -ForegroundColor $(if([int]$($result.Split('|')[1]) -eq 0) { 'Red' } else { 'Green' });


$result = $(sqlcmd.exe -s "|" -W -h -1 -U $usr -P $pwd -S $srv -Q @"
  SET NOCOUNT ON;
  SELECT
    'Check count TXN to POSDB ('+ LEFT(CONVERT(NVARCHAR(8),DATEADD(HOUR, -1, GETDATE()), 108), 5) + ' - ' + LEFT(CONVERT(NVARCHAR(8),GETDATE(), 108), 5) + ')', 
    COUNT(1)
  FROM POSDB.dbo.TLInModify WITH(NOLOCK)
  WHERE sTableName = 'TTHSale'
    AND nModiDate = CONVERT(NVARCHAR(8),GETDATE(), 112)
    AND nModiTime BETWEEN REPLACE(LEFT(CONVERT(NVARCHAR(8),DATEADD(HOUR, -1, GETDATE()), 108), 5),':','') + '00' 
    AND REPLACE(LEFT(CONVERT(NVARCHAR(8),GETDATE(), 108), 5),':','') + '00'
"@)
Write-Host " - POSDB $($result.Split('|')[0]), Count: " -NoNewline; 
Write-Host $([int]$result.Split('|')[1]) -ForegroundColor $(if([int]$($result.Split('|')[1]) -eq 0) { 'Red' } else { 'Green' });


$result = $(sqlcmd.exe -s "|" -W -h -1 -U $usr -P $pwd -S $srv -Q @"
  SET NOCOUNT ON;
  SELECT 
    TLInDGenSales.nGenStatus,sStatusDesc, bGenComplete, bSAPSend,
    COUNT(1)
  FROM POSDB.dbo.TLInDGenSales WITH(NOLOCK) 
    JOIN POSDB.dbo.TMGenStatus ON TMGenStatus.nGenStatus = TLInDGenSales.nGenStatus 
  WHERE TLInDGenSales.nDate = CONVERT(NVARCHAR(8),GETDATE(), 112)
  GROUP BY TLInDGenSales.nGenStatus,sStatusDesc, bGenComplete, bSAPSend
  ORDER BY TLInDGenSales.nGenStatus
"@)

# Check generate file to SAP|Send file  success|1|1
Write-Host " - POSDB Check generate file to SAP.";
if ($result.length -ne 0) {
  foreach ($row in $result.Split([Environment]::NewLine)) {
    $aRow = $row.Split('|')
    Write-Host "   > Status: " -NoNewline; 
    Write-Host $($aRow[1]) -ForegroundColor $(if([int]$aRow[0] -gt 5000) { 'Red' } else { 'Green' }) -NoNewline;
    Write-Host " (Total: $($aRow[4]), GenComplete: $($aRow[2]), SAPSend: $($aRow[3]))" -ForegroundColor Gray; 
  }
} else {
  Write-Host "   > Status: " -NoNewline; 
  Write-Host "N\A" -ForegroundColor Red -NoNewline;
  Write-Host " (Total: 0, GenComplete: 0, SAPSend: 0)" -ForegroundColor Gray;
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
  }
]