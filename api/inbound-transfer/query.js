
// const sql = require('mssql')
// const prod = require('../config-prod.js')

// module.exports = async () => {
//   let pool = await sql.connect(prod)
//   let results = await pool.request().query(`
//     SELECT COUNT(*) nTotal FROM POSGW..TFileTransUp a WITH(NOLOCK)
//       WHERE a.sStatus IN (3,5)
//     UNION ALL SELECT COUNT(*) FROM POSGW..TFileTransUp a WITH(NOLOCK)
//     WHERE a.sStatus IN (4,6) AND
//       CONVERT(DATETIME,STUFF(STUFF(CONVERT(VARCHAR(8), nStartDate),5,0,'-'),8,0,'-')+' '+STUFF(STUFF(LEFT(RIGHT('000000' + CONVERT(VARCHAR(6), nStartTime), 6),6),3,0,':'),6,0,':'),120)
//       >= CONVERT(DATE, GETDATE())
//     UNION ALL SELECT COUNT(*) FROM POSGW..TFileTransUp a WITH(NOLOCK)
//     WHERE a.sStatus = 0 AND
//       CONVERT(DATETIME,STUFF(STUFF(CONVERT(VARCHAR(8), nStartDate),5,0,'-'),8,0,'-')+' '+STUFF(STUFF(LEFT(RIGHT('000000' + CONVERT(VARCHAR(6), nStartTime), 6),6),3,0,':'),6,0,':'),120)
//       >= CONVERT(DATE, GETDATE())
//   `)
//   sql.close()
//   if (!!results['recordset']) {
//     return {
//       wait: results['recordset'][0].nTotal,
//       fail: results['recordset'][1].nTotal,
//       complete: results['recordset'][2].nTotal
//     }
//   } else {
//     return { wait: 0, fail: 0, complete: 0 }
//   }
// }
module.exports = {
  status: `
    SELECT COUNT(*) nTotal FROM POSGW..TFileTransUp a WITH(NOLOCK)
      WHERE a.sStatus IN (3,5)
    UNION ALL SELECT COUNT(*) FROM POSGW..TFileTransUp a WITH(NOLOCK)
    WHERE a.sStatus IN (4,6) AND
      CONVERT(DATETIME,STUFF(STUFF(CONVERT(VARCHAR(8), nStartDate),5,0,'-'),8,0,'-')+' '+STUFF(STUFF(LEFT(RIGHT('000000' + CONVERT(VARCHAR(6), nStartTime), 6),6),3,0,':'),6,0,':'),120)
      >= CONVERT(DATE, GETDATE())
    UNION ALL SELECT COUNT(*) FROM POSGW..TFileTransUp a WITH(NOLOCK)
    WHERE a.sStatus = 0 AND
      CONVERT(DATETIME,STUFF(STUFF(CONVERT(VARCHAR(8), nStartDate),5,0,'-'),8,0,'-')+' '+STUFF(STUFF(LEFT(RIGHT('000000' + CONVERT(VARCHAR(6), nStartTime), 6),6),3,0,':'),6,0,':'),120)
      >= CONVERT(DATE, GETDATE())
  `,
  queue: `
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
  graph: `
    SELECT STUFF(STUFF(CONVERT(VARCHAR(8), nStartDate),5,0,'-'),8,0,'-')+' '+CONVERT(VARCHAR(5),STUFF(LEFT(RIGHT('000000' + CONVERT(VARCHAR(6), nStartTime), 6),6),3,0,':'))
    , COUNT(*) aa
    FROM POSGW..TDFileTransUp WITH(NOLOCK) 
    WHERE sStatus = 0 AND CONVERT(DATETIME,STUFF(STUFF(CONVERT(VARCHAR(8), nStartDate),5,0,'-'),8,0,'-')+' '+CONVERT(VARCHAR(5),STUFF(LEFT(RIGHT('000000' + CONVERT(VARCHAR(6), nStartTime), 6),6),3,0,':')),120) > 
      DATEADD(HOUR, -24, GETDATE())
    GROUP BY nStartDate, CONVERT(VARCHAR(5),STUFF(LEFT(RIGHT('000000' + CONVERT(VARCHAR(6), nStartTime), 6),6),3,0,':'))
    ORDER BY nStartDate, CONVERT(VARCHAR(5),STUFF(LEFT(RIGHT('000000' + CONVERT(VARCHAR(6), nStartTime), 6),6),3,0,':'))
  `
}
  

// ----Script Check File XML ทำเสร็จที่ TDFileTransUp@POSGW (per Hours)





// select * from TMPOSGWStatus where sTableName='TFileTransUp'