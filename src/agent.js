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
function recordMemUsageFn(output, options) {
  const interval = option.interval || 1000
  setInterval(() => {
    process.send(process.memoryUsage());
  }, interval);
}

function requestGCFn(output, options) {
  if(!options.exposeGC) {
    console.log('Garbage Collection is not enabled, please start memwatch-ui with the exposeGC option turn on');
    return;
  }
  return gc();
}

function recordRequestFn(output, options) {

}

function agent (options) {
  return { };
}

exports.recordMemUsage = recordMemUsageFn;
exports.requestGC =requestGCFn;
exports.recordRequest = recordRequestFn;
exports.start = (options) => {

}
