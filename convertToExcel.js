const { workerData, parentPort } = require("worker_threads");
const { Parser } = require("json2csv");
const fs = require("fs");

parentPort.postMessage(convertToExcel(workerData.data));

function convertToExcel(data) {
  try {
    const start = Date.now();
    while (Date.now() - start < 100000) {}
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(data);
    const fileName=new Date();
    fs.writeFile(`${fileName}-csv.xlsx`, csv, (err) => {
      if (err) {
        throw err;
      }
    });
  } catch (error) {
    console.log("error", error);
    throw new Error("something went wrong!");
  }
}
