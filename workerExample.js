const { parentPort, workerData } = require("worker_threads");

parentPort.postMessage(runLoop(workerData.data));

function runLoop(data) {
  const start = Date.now();
  while (Date.now() - start < data) {}
  return { message: "Time has passed" };
}
