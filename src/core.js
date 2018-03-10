const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

/**
 *
 * @param appPath
 */
function spawnApplication (appPath) {
  const fullAppPath = path.resolve(appPath);
  const exists = fs.existsSync(fullAppPath);
  if (!exists) {
    throw new Error(`Could not find node application as ${fullAppPath}`);
  }

  console.log('app path exists');
  const appStream = spawn(`node`, [fullAppPath], {
    stdio:['ipc', 'pipe', 'pipe'],
  });

  return handleAppStream(appStream, fullAppPath);
}

/**
 *
 * @param stream
 * @param appPath
 */
function handleAppStream (stream, appPath) {
  stream.on('message', (data) => {
    console.log(data);
  });

  stream.stderr.on('error', (err) => {
    console.log(`Error occurred in child process [${appPath}]`, err);
  });
}

// TODO: change this to get paramters via yargs
exports.spawnApp = spawnApplication;

