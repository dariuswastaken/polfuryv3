const { exportModules } = require('../core/baseExportFSModule');

module.exports = {
  buttons: exportModules(__dirname, './buttons')
}