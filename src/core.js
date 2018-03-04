const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

function spawnApplication (appPath) {
    const fullAppPath = path.resolve(appPath);
    const exists = fs.existsSync(fullAppPath);
    if (!exists) {
        throw new Error(`Could not find node application as ${fullAppPath}`);
    }

    return spawn(`node`, [fullAppPath], {
        stdio:['ipc', 'pipe', 'pipe'],
    });
}

// TODO: change this to get paramters via yargs
module.exports = spawnApplication(process.env.APP_PATH);

