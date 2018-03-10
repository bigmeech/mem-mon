/**
 * Agent captures
 * - memory usage stats,
 * - request stats,
 * - calls GC at set intervals or lets you do that manually from the UI
 * - send v8 heap snapshots (v2)
 *
 * Charts
 * - request count vs time
 * - measure your heap size against time (v2)
 * - measures your function calls vs heap size (v2)
 * - measures your time vs function calls (v2)
 * - Event data is sent to mem-mon via IPC communication.
 *
 * Additional Info
 * The monitor runs on a seperate isolated process so as not to o
 */

const options = {};

/**
 *
 * @param _options
 */
function recordMemUsage(_options) {
  const interval = _options.interval || 1000;
  setInterval(() => {
    process.send(JSON.stringify(process.memoryUsage()));
  }, interval);
}

/**
 *
 * @param _options
 * @returns {*}
 */
function requestGCFn(_options) {
  if(!_options.exposeGC) {
    console.log('Garbage Collection is not enabled, please start memwatch-ui with the exposeGC option turn on');
    return;
  }
  return gc();
}

/**
 *
 * @param _options
 */
function recordRequestFn(_options) {
}

/**
 *
 * @param key
 * @param value
 */
exports.setConfig = (key, value) => {
  options[key] = value;
};

/**
 *
 * @param _options
 */
exports.start = (_options) => {
  if (_options.memWatcher) {
    return recordMemUsage(_options);
  }
};
