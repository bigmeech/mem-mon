#!/usr/bin/env node

const path = require('path');
const { spawn } = require('child_process');
const ui = require('./src/ui');
const argv = require('yargs')
  .option('c', {
    alias: 'config',
    describe: 'use config file',
    type: 'string'
  })
  .option('e', {
    alias: 'entryFile',
    describe: 'specify entry file',
    type: 'string'
  })
  .option('i', {
    alias: 'interval',
    describe: 'interval to send metrics to ui',
    default: 3000,
    type: 'number'
  })
  .option('p', {
    alias: 'port',
    describe: 'port to run monitor interface',
    type: 'number'
  })
.argv;

function initOptions () {
  const options = {};
  const appConfig = require(path.resolve(__dirname, 'package.json'));
  const mainFile = appConfig.main;

  // use main file in package.json if an entry file is not supplied
  options.entryFile = argv.entryFile || mainFile;
  options.uiPort = argv.port || 5550;
  return options;
}

if(!nodeAppFile) {
  try {
    parent = spawn('node', [mainFile]);
  } catch (e) {
    console.log(`Could not start node application: ${appConfig.name}\n -`, e.message);
  }

  ui.start({
    heartBeatInterval: 3000,
    uiPort: 5550,
  });
}

// this should be called from the app we want to monitor
exports.agent = require('./src/agent');


