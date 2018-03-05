const ui = require('./src/ui');
const command = require('yargs');
/**
  this should be called as a command from the cli
  ui.start({
    heartBeatInterval: 3000,
    uiPort: 5550,
  });
**/

// this should be called from the app we want to monitor
exports.agent = require('./src/agent');


