console.log("before delay");

function delayBySeconds(sec) {
  let start = (now = Date.now());
  while (now - start < sec * 1000) {
    now = Date.now();
  }
}

delayBySeconds(5);

console.log('after delay');