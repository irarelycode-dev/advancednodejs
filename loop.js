//node myFile.js

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

//new timers,tasks,operations are recorded from myFile running
myFile.runContents();

function shouldContinue() {
  //  check one: any pending setTimout(),setImmediate(),setInterval()
  // check two: pending OS task-like http server listening to some port
  // check three:any pending long running operations like fs module
  return (
    pendingTimers.length || pendingOSTasks.length || pendingOperations.length
  );
}

//fake eventloop
while (shouldContinue()) {
  // 1. node looks for pending timers and sees if callbacks can be called, setTimeout,setInterval
  // 2. node looks for pendingOSTasks and pendingOperations and calls relevant callbacks
  // 3. node execution pauses. Continue when a new pendingOSTask is done,pendingOperation is done,a timer is abt to complete
  // 4. node looks for pending timers, setImmediate
  // 5. handle any close events
}
//every single time the event loop runs,we call it one tick;

//exit to terminal
