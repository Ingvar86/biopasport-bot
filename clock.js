var CronJob = require('cron').CronJob;
var task = require('./task');
const cronTime = process.env.CRON_TIME;

new CronJob({
  cronTime: cronTime,
  onTick: task,
  start: true,
  timeZone: "Europe/Kiev"
});