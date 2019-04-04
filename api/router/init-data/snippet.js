module.exports = [
  {
    title: 'Checking IIS Inbound Services',
    file: 'iis-services.ps1',
    task: 'inbound-checking',
    order: 0,
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
    order: 2,
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
    order: 3,
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
    title: 'Log Watch file',
    file: 'error-logs.ps1',
    task: 'inbound-checking',
    order: 4,
    user: 'thkanane',
    avatar: 'https://avatars.dicebear.com/v2/male/thkanane.svg',
    private: false,
    mode: 'powershell',
    content: 
`# account administrator
$user = 'pos\administrator'
$pass = 'P@ssw0rd'

$Time = [System.Diagnostics.Stopwatch]::StartNew()

# Check File in Network Folder
Write-Host "\`n Check Status and Error in log files" -ForegroundColor Blue
Write-Host " - Mapping Network Drive";

$IP55 = '10.101.147.55'
$FTPData = "\\$IP55\Ftp Data"
NET USE $FTPData \delete > $null
NET USE $FTPData /user:$user $pass > $null

function ReadingError
{
  $LogFiles = $(Get-ChildItem -Path $args[0] -Recurse -File -Filter *.log \`
    | Sort-Object -Property LastWriteTime -Descending \`
    | Select-Object -First 1)

  if ($LogFiles.Count -eq 0) { Write-Host 'Empty directory.' -ForegroundColor Red }
  Foreach ($File in $LogFiles) {
    $IsError = 0
    $oLine = New-Object System.Collections.Generic.List[System.Object]
    Write-Host $File.Name -ForegroundColor Yellow -NoNewline;
    Write-Host " ($([math]::truncate($File.Length / 1KB)) KB) " -NoNewline;
    Foreach ($line in (Get-Content $File.FullName)) {
      if ($line -match $args[1]) {
        $IsError += 1
        $oLine.Add($line)
        if ($oLine.Count -gt 12) { $oLine.RemoveAt(0) }
      }
    }

    if ($IsError -eq 0) {
      Write-Host " >> OK." -ForegroundColor Green;
    } else {
      Write-Host " >> ERROR. ($IsError lines)" -ForegroundColor Red;
      Write-Host " " -ForegroundColor Red;
      Foreach ($line in $oLine) {
        Write-Host "   " -NoNewline;
        Write-Host $line -ForegroundColor Red;
      }
      Write-Host " " -ForegroundColor Red;
    }
    Clear-Variable -Name LogFiles, IsError, oLine, line
  }
}

Write-Host " - BackUpFile Reading: " -NoNewline;
ReadingError "$FTPData\POS\prd\Log\BackUpFile" ' ERROR -'

Write-Host " - Gen XML Inbound Reading: " -NoNewline; 
ReadingError "$FTPData\POS\prd\Log\Gen XML Inbound" ' ERROR -'

Write-Host " - GenerateXML Reading: " -NoNewline; 
ReadingError "$FTPData\POS\prd\XML\Log\GenerateXML" 'error: '

Write-Host " - CallFTPWebService2DST Reading: " -NoNewline; 
ReadingError "$FTPData\POS\prd\Log\CallFTPWebService2DST" ' ERROR -'

Write-Host " - OutboundApp Reading: " -NoNewline; 
ReadingError "$FTPData\POS\prd\Log\OutboundApp" ' ERROR -'

Write-Host " - POSInterimUpdate_inbound Reading: " -NoNewline;  
ReadingError "$FTPData\POS\prd\Log\POSInterimUpdate_inbound" ' ERROR -'


Write-Host "\`n   " -NoNewline;
Write-Host $([string]::Format("(elapsed: {0:d2}:{1:d2})", $($Time.Elapsed).minutes, $($Time.Elapsed).seconds))`,
    updated: new Date,
    created: new Date
  },
  { 
    title: 'Log Count Error files',
    file: 'count-logs.ps1',
    task: 'inbound-checking',
    order: 5,
    user: 'thkanane',
    avatar: 'https://avatars.dicebear.com/v2/male/thkanane.svg',
    private: false,
    mode: 'powershell',
    content: 
`# account administrator
$user = 'pos\administrator'
$pass = 'P@ssw0rd'

$Time = [System.Diagnostics.Stopwatch]::StartNew()

# # Monitor Error File in Network Folder
Write-Host "\`n Counting Error files" -ForegroundColor Blue
Write-Host " - Mapping Network Drive";

$IP55 = '10.101.147.55'
$FTPData = "\\$IP55\Ftp Data"
NET USE $FTPData \delete > $null
NET USE $FTPData /user:$user $pass > $null

function CountFiles([string]$msg, [string]$folder)
{
  Write-Host $msg -NoNewline;
  if ($(Test-Path $folder -PathType Container)) {
    $Total = $(Get-ChildItem -Path $folder -File).Count
    Write-Host $Total -ForegroundColor $(if($Total -ne 0) { 'Red' } else { 'Green' }) -NoNewline;
  } else {
    Write-Host "0" -ForegroundColor Green -NoNewline;
  }
  Write-Host " files";  
}

CountFiles " - IDoc Outbound Error: " "$FTPData\POS\prd\IDoc\Outbound_Error"
CountFiles " - XML Inbound Error: " "$FTPData\POS\prd\XML\Inbound_Error"
CountFiles " - XML Upload Error: " "$FTPData\POS\prd\XML\Upload_Error"
CountFiles " - TextFile Outbound Error: " "$FTPData\POS\prd\TextFile\Outbound_Error"
CountFiles " - TextFile Pro Fail ($(Get-Date -UFormat "%Y%m%d")): " "$FTPData\POS\prd\TextFile\Pro_Fail\$(Get-Date -UFormat "%Y%m%d")"


Write-Host "\`n   " -NoNewline;
Write-Host $([string]::Format("(elapsed: {0:d2}:{1:d2})", $($Time.Elapsed).minutes, $($Time.Elapsed).seconds))`,
    updated: new Date,
    created: new Date
  },
  {
    title: 'Monitor Logfiles',
    file: 'monitor-logs.ps1',
    task: 'inbound-checking',
    order: 6,
    user: 'thkanane',
    avatar: 'https://avatars.dicebear.com/v2/male/thkanane.svg',
    private: false,
    mode: 'powershell',
    content: 
`# account administrator
$user = 'pos\administrator'
$pass = 'P@ssw0rd'

$Time = [System.Diagnostics.Stopwatch]::StartNew()

# # Monitor Error File in Network Folder
Write-Host "\`n Monitor XML, Text Receive files" -ForegroundColor Blue
Write-Host " - Mapping Network Drive";

$IP55 = '10.101.147.55'
$FTPData = "\\$IP55\Ftp Data"
NET USE $FTPData \delete > $null
NET USE $FTPData /user:$user $pass > $null

function CountFiles([string]$msg, [string]$folder)
{
  Write-Host $msg -NoNewline;
  $Total = $(Get-ChildItem -Path $folder -File).Count
  Write-Host $Total -ForegroundColor Yellow -NoNewline;
  Write-Host " files";
}

CountFiles " - XML Download_Receive: " "$FTPData\POS\prd\XML\Download_Receive"
CountFiles " - XML Upload_Receive: " "$FTPData\POS\prd\XML\Upload_Receive"
CountFiles " - TextFile Outbound_Receive_Sap: " "$FTPData\POS\prd\TextFile\Outbound_Receive_Sap"
CountFiles " - TextFile Pro_Receive: " "$FTPData\POS\prd\TextFile\Pro_Receive"
CountFiles " - IDoc Outbound_Receive_Sap: " "$FTPData\POS\prd\IDoc\Outbound_Receive_Sap"

Write-Host "\`n   " -NoNewline;
Write-Host $([string]::Format("(elapsed: {0:d2}:{1:d2})", $($Time.Elapsed).minutes, $($Time.Elapsed).seconds))`,
    updated: new Date,
    created: new Date
  },
  {
    title: 'Checking Services Status',
    file: 'iis-services.ps1',
    task: 'inbound-checking',
    order: 7,
    user: 'thkanane',
    avatar: 'https://avatars.dicebear.com/v2/male/thkanane.svg',
    private: false,
    mode: 'powershell',
    content: 
`$IP55 = '10.101.147.55'
$IP56 = '10.101.147.56'

$Time = [System.Diagnostics.Stopwatch]::StartNew()

# account administrator
$user = 'pos\administrator'
$pass = 'P@ssw0rd'
$pass_encrpt = $pass | ConvertTo-SecureString -AsPlainText -Force
$Cred = New-Object System.Management.Automation.PsCredential($user, $pass_encrpt)

Write-Host "\`n Checking Services Window" -ForegroundColor Blue
Get-WmiObject -Class win32_service -Credential $Cred \`
  -ComputerName $IP55,$IP56 \`
  | Where-Object { 
    $_.Name -eq "BackupFile" -or
    $_.Name -eq "InboundTransferWinDowService" -or
    $_.Name -eq "CMGPOS Inbound_XML_TO_SAP" -or
    $_.Name -eq "GenerateXML Windows Service" -or
    $_.Name -eq "CallFTPWebService2DST" -or
    $_.Name -eq "StockOnlineWindowsService" -or
    $_.Name -eq "BTSSvc{894C15BD-DBFC-4349-85BA-5C3808FC00D0}"
  } \`
  | Select-Object DisplayName, Status, State, ExitCode \`
  | Format-Table -Wrap -AutoSize

Write-Host "\`n   " -NoNewline;
Write-Host $([string]::Format("(elapsed: {0:d2}:{1:d2})", $($Time.Elapsed).minutes, $($Time.Elapsed).seconds))`,
    updated: new Date,
    created: new Date
  },
  {
    title: 'Disk spacing On Server Less 10%',
    file: 'disk-freespace.ps1',
    task: 'inbound-checking',
    order: 8,
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

# account administrator
$user = 'pos\administrator'
$pass = 'P@ssw0rd'
$pass_encrpt = $pass | ConvertTo-SecureString -AsPlainText -Force
$Cred = New-Object System.Management.Automation.PsCredential($user, $pass_encrpt)

Write-Host "\`n Checking Disk Freespace..." -ForegroundColor Blue
foreach ($ip in @($IP42,$IP43,$IP44,$IP46,$IP47,$IP48,$IP49,$IP50,$IP51,$IP54,$IP55,$IP56,$IP59,$IP62,$IP69,$IP70)) {
Get-WmiObject -Class win32_logicalDisk -Credential $Cred \`
  -ComputerName $ip \`
  | Where-Object {$_.drivetype -eq 3} \`
  | Select-Object \`
    @{n = "IP Address"; e = {$ip}}, DeviceID, \`
    @{n = "Free(MB)"; e = {[math]::truncate($_.freespace / 1MB)}}, \`
    @{n = "Size(MB)"; e = {[math]::truncate($_.size / 1MB)}}, \`
    @{
      n = "Free(%)";
      e = {[math]::truncate([math]::truncate($_.freespace / 1MB) * 100 / [math]::truncate($_.size / 1MB))};
    } \`
  | Sort-Object -Property 'Free(%)', PSComputerName \`
  | Where {$_.'Free(%)' -le 20 -or $_.'Free(%)' -eq $Null} \`
  | Format-Table -Wrap -AutoSize
}

Write-Host "\`n   " -NoNewline;
Write-Host $([string]::Format("(elapsed: {0:d2}:{1:d2})", $($Time.Elapsed).minutes, $($Time.Elapsed).seconds))`,
    updated: new Date,
    created: new Date
  },
  {
    title: 'Powershell Version Checking',
    file: 'version-ps.ps1',
    task: 'inbound-checking',
    order: 1,
    user: 'thkanane',
    avatar: 'https://avatars.dicebear.com/v2/male/thkanane.svg',
    private: false,
    mode: 'powershell',
    content: 
`if ($PSVersionTable.PSVersion.Major -lt 5) {
  Write-Host "Powershell supported is greater or equal 5.0 (version $($PSVersionTable.PSVersion.Major))" -ForegroundColor Red
  exit 1
}

Clear-Host`,
    updated: new Date,
    created: new Date
  }
]