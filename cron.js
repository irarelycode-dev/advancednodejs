const cron = require("node-cron");
const shell = require("shelljs");

cron.schedule("* * * * * *", () => {
  console.log("Scheduler");
  if (shell.exec("ls").code !== 0) {
    console.log("Something went wrong!");
  }
});
