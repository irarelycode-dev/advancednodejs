const https = require("https");
const crypto = require("crypto");

const start = Date.now();

function doRequest() {
  https
    .request("https://www.google.com", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log(Date.now() - start);
      });
    })
    .end();
}

doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();

//benchmarking requests
//all requests are completed at the same time
//libuv is delegating the network task to underlying OS, so there is no blocking of eventloop. OS has to decide whether to make a new thread or not.
// what funcs in node std lib use OS async feature? almost all networking stuff
// how does os async stuff fit into event loop? pendingOSTasks array



// node index.js
//process and execute code in index.js
//eventloop:
// look for work to do in timers,OS tasks,threadpool->>> if no exit
//run setTimeout and setInterval
//run callbacks for any os tasks or threadpool tasks( this is 99% of the code)
//pause and wait for stuff to happen
//run setImmediate
//handle events



// one entire loop cycle is called an eventloop tick