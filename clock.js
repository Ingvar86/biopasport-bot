var CronJob = require('cron').CronJob;
var task = require('./task');
const cronTime = process.env.CRON_TIME || '0 0-59 0,6,7 * * 1-5';

new CronJob({
  cronTime: cronTime,
  onTick: task,
  start: true,
  timeZone: "Europe/Kiev"
});