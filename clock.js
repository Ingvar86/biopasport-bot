var CronJob = require('cron').CronJob;

function test() {
    console.log('clock test')
}

new CronJob({
  cronTime: "15 * * * * *", // everyday, 9:13, 11:13, 4:13, 8:13,
  onTick: test,
  start: true,
  timeZone: "Europe/Kiev"
});