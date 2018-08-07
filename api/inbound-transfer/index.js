const { Router } = require('express')
// const sql = require('mssql')

const router = Router()

/* GET users listing. */
router.get('/inbound-transfer', (req, res, next) => {
  // (async () => {
  //   let pool = await sql.connect(config)
  //   let result1 = await pool.request().query('select * from mytable where id = @input_parameter')
  //   console.dir(result1)
  //   // Stored procedure
  //   // let result2 = await pool.request()
  //   //     .input('input_parameter', sql.Int, value)
  //   //     .output('output_parameter', sql.VarChar(50))
  //   //     .execute('procedure_name')
  //   console.dir(result2)
  // })().catch(ex => {

  // })
  // sql.on('error', err => {
  //     // ... error handler
  // })
  res.end('{}')
})

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
