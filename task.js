'use strict';
var winston = require('winston'),
    request = require('request'),
    bot = require('./telegram/bot'),
    url = 'https://igov.org.ua/api/service/flow/63?nID_Server=0&nID_Service=176&nID_SubjectOrganDepartment=18&sID_Public_SubjectOrganJoin=1375'

winston.level = process.env.DEBUG_LEVEL || 'info';

var vacantNotify = true;

module.exports = function() {
    winston.info('fetch data');
    request.get(url, function (error, response, body) {
        if (!error) {
            console.log(JSON.stringify(body));
            let json = JSON.parse(body);
            if (json.aDay.length > 0) {
                if (vacantNotify) {
                    bot.notifyAll('vacant time').then(() => {
                        vacantNotify = false;
                    });
                }
            }
            else if (!vacantNotify) {                
                bot.notifyAll('no vacant time').then(() => {
                    vacantNotify = true;
                });
            }
        }
        else {
            winston.error('request error: ', error);
        }
    });
}