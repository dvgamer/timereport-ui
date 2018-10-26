require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const api = __webpack_require__(2);
const port = 3001;
api.handler.listen(port, () => console.log(` READY  Listening on http://localhost:${port}`));

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const app = __webpack_require__(0)();
const consola = __webpack_require__(3);
const http = __webpack_require__(4).Server(app);
const io = __webpack_require__(5)(http);

const sql = __webpack_require__(6);
const prod = __webpack_require__(7);

// Require API routes
const inboundTransder = __webpack_require__(8);
const query = __webpack_require__(9);

// Import API Routes
app.use(inboundTransder);

// sql.close()
http.listen(5000, () => {

  io.on('connection', socket => {
    consola.info('socket.io user connected');
    socket.on('disconnect', () => {
      consola.info('socket.io user disconnected');
    });
  });

  // setInterval(() => {
  //   io.emit('inbound-realtime-graph', [])
  //   io.emit('inbound-realtime-queue', [])
  //   io.emit('inbound-realtime-status', { wait: 0, fail: 0, complete: 0 })
  // }, 1000)

  let poolMain = async () => {
    let pool = await sql.connect(prod);

    let taskGraph = async () => {
      let results = await pool.request().query(query.graph);
      io.emit('inbound-realtime-graph', results['recordsets'][0]);
      setTimeout(taskGraph, 1000);
    };

    let taskQueue = async () => {
      let results = await pool.request().query(query.queue);
      io.emit('inbound-realtime-queue', results['recordsets'][0]);
      setTimeout(taskQueue, 500);
    };

    let taskStatus = async () => {
      let results = await pool.request().query(query.status);
      io.emit('inbound-realtime-status', {
        wait: results['recordset'][0].nTotal,
        fail: results['recordset'][1].nTotal,
        complete: results['recordset'][2].nTotal
      });
      setTimeout(taskStatus, 1000);
    };
    taskGraph();
    taskQueue();
    taskStatus();
  };
  // poolMain()
});

// let exitHandler = (options, err) => {
//   sql.close()
//   consola.error('Processing Stoped.')
//   if (options.exit) process.exit();
// }

// //catches ctrl+c event
// process.on('SIGINT', exitHandler.bind(null, { exit: true }))

// // catches "kill pid" (for example: nodemon restart)
// process.on('SIGUSR1', exitHandler.bind(null, { exit: true }))
// process.on('SIGUSR2', exitHandler.bind(null, { exit: true }))
// process.on('uncaughtException', exitHandler.bind(null, { exit: true }))

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("consola");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("mssql");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = {
  user: 'posappadm',
  password: 'qwerty8*',
  server: '10.101.147.46\\poscmg',
  database: 'POSGW',
  options: {
    encrypt: true
  }
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const { Router } = __webpack_require__(0);
const router = Router();

/* GET users listing. */
router.get('/inbound-transfer/status', (req, res) => {
  // dataStatus().then(data => {
  //   res.json(data)
  // }).catch(ex => {
  res.json({ error: '' });
  // })
});

// /* GET user by ID. */
// router.get('/inbound-transfer/:id', function (req, res, next) {
//   const id = parseInt(req.params.id)
//   if (id >= 0 && id < users.length) {
//     res.json(users[id])
//   } else {
//     res.sendStatus(404)
//   }
// })

module.exports = router;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = {
  status: `
    SELECT COUNT(*) nTotal FROM POSGW..TFileTransUp a WITH(NOLOCK)
      WHERE a.sStatus IN (3,5)
    UNION ALL SELECT COUNT(*) FROM POSGW..TFileTransUp a WITH(NOLOCK)
    WHERE a.sStatus IN (4,6) AND
      CONVERT(DATETIME,STUFF(STUFF(CONVERT(VARCHAR(8), nStartDate),5,0,'-'),8,0,'-')+' '+STUFF(STUFF(LEFT(RIGHT('000000' + CONVERT(VARCHAR(6), nStartTime), 6),6),3,0,':'),6,0,':'),120)
      >= CONVERT(DATE, DATEADD(DAY, -7, GETDATE()))
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
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.map