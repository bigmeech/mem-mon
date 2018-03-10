#!/usr/bin/env node

const path = require('path');
const ui = require('./ui');
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
  const appConfig = require(path.resolve(process.cwd(), 'package.json'));
  const mainFilePath = path.resolve(process.cwd(), appConfig.main);
  let entryFile;

  if(argv.entry) {
    entryFile = path.resolve(__dirname, argv.entry, process.cwd());
  }

  if(argv._.length >= 1) {
    entryFile = argv._[0];
  }

  // use main file in package.json if an entry file is not supplied
  options.entry = entryFile || mainFilePath;
  options.uiPort = argv.port || 5550;
  return options;
}

// create child process of node app and starts server;
ui.initialize(initOptions());
