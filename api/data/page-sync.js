

module.exports = [
  {
    route: 'app-inbound-transfer',
    module: 'iis-online',
    crontab: null,
    query: 'iis_service_url.ip48_in',
    data: { online: true, label: 'http://10.101.147.48' },
    updated: new Date(),
    created: new Date()
  },
  {
    route: 'app-inbound-transfer',
    module: 'iis-online',
    crontab: null,
    query: 'iis_service_url.ip49_in',
    data: { online: true, label: 'http://10.101.147.49' },
    updated: new Date(),
    created: new Date()
  },
  {
    route: 'app-inbound-transfer',
    module: 'iis-online',
    crontab: null,
    query: 'iis_service_url.ip61_in',
    data: { online: true, label: 'http://10.101.147.61' },
    updated: new Date(),
    created: new Date()
  },
  {
    route: 'app-inbound-transfer',
    module: 'iis-online',
    crontab: null,
    query: 'iis_service_url.ip48_out',
    data: { online: true, label: 'http://10.101.147.48' },
    updated: new Date(),
    created: new Date()
  },
  {
    route: 'app-inbound-transfer',
    module: 'iis-online',
    crontab: null,
    query: 'iis_service_url.ip49_out',
    data: { online: true, label: 'http://10.101.147.49' },
    updated: new Date(),
    created: new Date()
  },
  {
    route: 'app-inbound-transfer',
    module: 'iis-online',
    crontab: null,
    query: 'iis_service_url.ip61_out',
    data: { online: true, label: 'http://10.101.147.61' },
    updated: new Date(),
    created: new Date()
  },
  {
    route: 'app-inbound-transfer',
    module: 'ftp-online',
    crontab: null,
    query: 'ftp_service_addr.ip59_inbound',
    data: { online: true, label: 'ftp://10.101.147.59' },
    updated: new Date(),
    created: new Date()
  },
  {
    route: 'app-inbound-transfer',
    module: 'ftp-online',
    crontab: null,
    query: 'ftp_service_addr.ip62_outbound',
    data: { online: true, label: 'ftp://10.101.147.62' },
    updated: new Date(),
    created: new Date()
  },
  {
    route: 'app-inbound-transfer',
    module: 'panel-status',
    crontab: '* * * * *',
    query: 
    `
    SELECT 'wait' sStatus, COUNT(*) nTotal FROM POSGW..TFileTransUp a WITH(NOLOCK)
    WHERE a.sStatus IN (3,5)
    UNION ALL 
    SELECT 'error', COUNT(*) FROM POSGW..TFileTransUp a WITH(NOLOCK)
    WHERE a.sStatus IN (4,6) AND
      CONVERT(DATETIME,STUFF(STUFF(CONVERT(VARCHAR(8), nStartDate),5,0,'-'),8,0,'-')+' '
      +STUFF(STUFF(LEFT(RIGHT('000000' + CONVERT(VARCHAR(6), nStartTime), 6),6),3,0,':'),6,0,':'),120) >= CONVERT(DATE, DATEADD(DAY, -7, GETDATE()))
    UNION ALL 
    SELECT  'success',COUNT(*) FROM POSGW..TFileTransUp a WITH(NOLOCK)
    WHERE a.sStatus = 0 AND
      CONVERT(DATETIME,STUFF(STUFF(CONVERT(VARCHAR(8), nStartDate),5,0,'-'),8,0,'-')+' '
      +STUFF(STUFF(LEFT(RIGHT('000000' + CONVERT(VARCHAR(6), nStartTime), 6),6),3,0,':'),6,0,':'),120) >= CONVERT(DATE, GETDATE())
    `,
    data: {},
    updated: new Date(),
    created: new Date()
  },
  {
    route: 'app-inbound-transfer',
    module: 'panel-graph-hour',
    crontab: '0 * * * *',
    query: 
    `
    SELECT 
    STUFF(STUFF(CONVERT(VARCHAR(8), nStartDate),5,0,'-'),8,0,'-') sDay, 
    CONVERT(VARCHAR(2),STUFF(LEFT(RIGHT('000000' + CONVERT(VARCHAR(6), nStartTime), 6),6),3,0,':')) sHour
    , COUNT(*) aa
    FROM POSGW..TDFileTransUp WITH(NOLOCK) 
    WHERE sStatus = 0 AND CONVERT(DATETIME,STUFF(STUFF(CONVERT(VARCHAR(8), nStartDate),5,0,'-'),8,0,'-')+' '+CONVERT(VARCHAR(5),STUFF(LEFT(RIGHT('000000' + CONVERT(VARCHAR(6), nStartTime), 6),6),3,0,':')),120) > 
        DATEADD(DAY, -7, GETDATE())
    GROUP BY nStartDate, CONVERT(VARCHAR(2),STUFF(LEFT(RIGHT('000000' + CONVERT(VARCHAR(6), nStartTime), 6),6),3,0,':'))
    ORDER BY nStartDate DESC, CONVERT(VARCHAR(2),STUFF(LEFT(RIGHT('000000' + CONVERT(VARCHAR(6), nStartTime), 6),6),3,0,':')) DESC
    `,
    data: [],
    updated: new Date(),
    created: new Date()
  },
  {
    route: 'app-inbound-transfer',
    module: 'panel-avg-speed',
    crontab: '0 0 * * *',
    query: 
    `
    SELECT CONVERT(DECIMAL(10,2), (SUM(nAvg)) / COUNT(*)) sAvg, MAX(nAvg) sMax from (
      SELECT CONVERT(DECIMAL(10,2), COUNT(*) / 60.0) nAvg
      FROM POSGW..TDFileTransUp WITH(NOLOCK) 
      WHERE sStatus = 0 AND CONVERT(DATETIME,STUFF(STUFF(CONVERT(VARCHAR(8), nStartDate),5,0,'-'),8,0,'-')+' '+CONVERT(VARCHAR(5),STUFF(LEFT(RIGHT('000000' + CONVERT(VARCHAR(6), nStartTime), 6),6),3,0,':')),120) > 
        DATEADD(DAY, -30, GETDATE())
      GROUP BY nStartDate, CONVERT(VARCHAR(2),STUFF(LEFT(RIGHT('000000' + CONVERT(VARCHAR(6), nStartTime), 6),6),3,0,':'))
    ) a WHERE nAvg > 0
    `,
    data: {},
    updated: new Date(),
    created: new Date()
  },
  {
    route: 'app-inbound-transfer',
    module: 'panel-sequence',
    crontab: '* * * * *',
    query: 
    `
    SELECT 'SaleT1CAccum' sTable, COUNT(1) nTotal FROM POSGW..TFileTransUp a WITH(NOLOCK)
    WHERE a.sStatus IN (3,5) AND (sZIPFileName LIKE 'SaleT1CAccum%')
    UNION ALL SELECT 'ActualSale', COUNT(*) FROM POSGW..TFileTransUp a WITH(NOLOCK)
    WHERE a.sStatus IN (3,5) AND (sZIPFileName LIKE 'ActualSale%')
    UNION ALL SELECT 'T1CSaleMember', COUNT(*) FROM POSGW..TFileTransUp a WITH(NOLOCK)
    WHERE a.sStatus IN (3,5) AND (sZIPFileName LIKE 'T1CSaleMember%')
    UNION ALL SELECT 'Daily', COUNT(1) FROM POSGW..TFileTransUp a WITH(NOLOCK)
    WHERE a.sStatus IN (3,5) AND (sZIPFileName LIKE 'Daily%')
    UNION ALL SELECT 'FullInvoice', COUNT(1) FROM POSGW..TFileTransUp a WITH(NOLOCK)
    WHERE a.sStatus IN (3,5) AND (sZIPFileName LIKE 'FullInvoice%')
    UNION ALL SELECT 'StaffPurchase', COUNT(1) FROM POSGW..TFileTransUp a WITH(NOLOCK)
    WHERE a.sStatus IN (3,5) AND (sZIPFileName LIKE 'StaffPurchase%')
    UNION ALL SELECT 'Number', COUNT(1) FROM POSGW..TFileTransUp a WITH(NOLOCK)
    WHERE a.sStatus IN (3,5) AND (sZIPFileName LIKE 'Number%')
    UNION ALL SELECT 'Time', COUNT(1) FROM POSGW..TFileTransUp a WITH(NOLOCK)
    WHERE a.sStatus IN (3,5) AND (sZIPFileName LIKE 'Time%')
    UNION ALL SELECT 'Others', COUNT(1) FROM POSGW..TFileTransUp a WITH(NOLOCK)
    WHERE a.sStatus IN (3,5) AND (sZIPFileName NOT LIKE 'SaleT1CAccum%' AND sZIPFileName NOT LIKE 'ActualSale%'
    AND sZIPFileName NOT LIKE 'T1CSaleMember%' AND sZIPFileName NOT LIKE 'Daily%' AND sZIPFileName NOT LIKE 'FullInvoice%'
    AND sZIPFileName NOT LIKE 'StaffPurchase%' AND sZIPFileName NOT LIKE 'Number%' AND sZIPFileName NOT LIKE 'Time%')
    `,
    data: {},
    updated: new Date(),
    created: new Date()
  }
]
