
class Logger {
  constructor(fileName) {
    this.fs = require('fs');
    this.fileName = fileName;
    this.fs.writeFileSync(this.fileName, 'Logging started...')
  }
  log(toLog) {
    // this.fs.writeFileSync(this.fileName, toLog)
    this.fs.appendFileSync(this.fileName, `\n ${toLog}`)
  }
}



module.exports = Logger;