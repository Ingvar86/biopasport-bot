'use strict';
var winston = require('winston'),
    request = require('request'),
    bot = require('./telegram/bot'),
    connectionService = require('./services/connectionService'),
    url = 'https://igov.org.ua/api/service/flow/63?nID_Server=0&nID_Service=176&nID_SubjectOrganDepartment=18&sID_Public_SubjectOrganJoin=1375'

winston.level = process.env.DEBUG_LEVEL || 'info';

request.get(url, function (error, response, body) {
    if (!error) {
        console.log(JSON.stringify(body));
        let json = JSON.parse(body);
        if (json.aDay.length > 0) {
            bot.notifyAll('vacant time');
        }
        bot.stopPolling();
        connectionService.closeConnection();
    }
    else {
        winston.error('request error: ', error);
    }
});