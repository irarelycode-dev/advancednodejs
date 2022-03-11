process.env.UV_THREADPOOL_SIZE=8;

const https = require("https");
const crypto = require("crypto");
const fs = require("fs");

const start = Date.now();

function doRequest() {
  https
    .request("https://www.google.com", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log('doRequest:',Date.now() - start);
      });
    })
    .end();
}

function doHash() {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    console.log("Hash:", Date.now() - start);
  });
}

doRequest();

fs.readFile("multitask.js", "utf-8", () => {
  console.log("fs:", Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();

//fs module and crypto stuffs come under the pendingOperations of the event loop and the combined order depends upon the cores  your computer has
//http requests are delegated to underlying OS by libuv. So this will not block event loop.

//doRequest()
//fs
//doHash()

//doRequest()
//fs
//doHash()


//fs module does not immediately access the file system. It first checks for the permissions. Once granted, does a statistic check, then reads a file.

//assign a threadpool size and see the difference
//threadpool size by default is 4