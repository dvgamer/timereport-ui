const fs = require('fs')
let readbytes = 0
let logFile = './tests/mongodump.bat'
let timeout = 300
fs.open(logFile, 'r', (err, fd) => {
  if (err) return console.error(err)
  readsome(fd)
})

function readsome(fd) {
  var stats = fs.fstatSync(fd) // yes sometimes async does not make sense!
  if (readbytes === 0) readbytes = stats.size
  let mtime = Math.floor((new Date() - new Date(stats.mtime)) / 1000)
  if (mtime > timeout) return fs.close(fd, err => {
    if (err) return console.error(err)
  })
  if (stats.size < readbytes + 1) {
    setTimeout(readsome.bind(this, fd), 100)
  } else {
    let bite_size = stats.size - readbytes
    fs.read(fd, Buffer.alloc(bite_size), 0, bite_size, readbytes, (err, bytecount, buff) => {
      if (err) return console.error(err)
        process.stdout.write(buff)
        readbytes += bytecount
        process.nextTick(readsome.bind(this, fd))
    })
  }
}
