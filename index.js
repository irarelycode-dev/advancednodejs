const express = require("express");
const redis = require("redis");
const crypto = require("crypto");
const Worker = require("worker_threads").Worker;
const axios=require('axios');

const app = express();
app.use(express.json());

function doWork(duration) {
  const start = Date.now();
  while (Date.now() - start < duration) {}
}

const runService = async (data) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./workerExample.js", { workerData: { data } });
    worker.on("message", (result) => resolve(result));
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`worker exited with code:${code}`));
      }
    });
  });
};

const convertToExcel = async (data) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./convertToExcel.js", { workerData: { data } });
    worker.on("message", (result) => resolve(result));
    worker.on("error", (err) => reject(err));
    worker.on("exit", (code) => {
      if (!code) reject(new Error(`worker exited with code:${code}`));
    });
  });
};

app.get("/slow", (req, res) => {
  doWork(5000);
  res.send("done");
});

app.get("/fast", (req, res) => {
  res.send("This was fast");
});

app.get("/workerThread", async (req, res) => {
  const result = await runService(10000);
  res.send({ result });
});

app.get("/convertToExcel", async (req, res) => {
  const data = await axios.get("https://jsonplaceholder.typicode.com/comments");
  const result = await convertToExcel(data.data);
  res.send("file written");
});

app.listen(3000, () => {
  console.log("server started");
});
