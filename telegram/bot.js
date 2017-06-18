'use strict';
var TelegramBot = require('node-telegram-bot-api');
var chatSetvice = require('../services/chatService');
var dep = require('../dep.json');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.BOT_TOKEN;
var bot;
// Create a bot that uses 'polling' to fetch new updates
if(process.env.NODE_ENV === 'production') {
    bot = new TelegramBot(token);
}
else {
    bot = new TelegramBot(token, { polling: true });
}

// temporary

// Matches "/start"
bot.onText(/\/start/, function (msg, match) {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

    var chatId = msg.chat.id;
    chatSetvice.saveChat(chatId);
  // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, 'notification started');
});

// Matches "/end"
bot.onText(/\/end/, function (msg, match) {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

    var chatId = msg.chat.id;
    chatSetvice.deleteChat(chatId);
  // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, 'notification ended');
});

bot.onText(/\/ping/, function (msg, match) {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

    var chatId = msg.chat.id;
  // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, 'pong');
});

bot.onText(/\/key/, function (msg, match) {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

    var chatId = msg.chat.id;
  // send back the matched "whatever" to the chat
    let keyboard = [];
    dep[0].deps.forEach(function(element) {
        keyboard.push([{text: element.name}]);
    });
    bot.sendMessage(chatId, 'м. Дніпро', {
        reply_markup: {
            keyboard: keyboard,
            one_time_keyboard: true
        }
    });
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  let findDep = dep[0].deps.find((elem) => {
    return elem.name === text;
  });
  if (findDep) {
    chatSetvice.saveChat(chatId, findDep.id);
  }

  // send a message to the chat acknowledging receipt of their message
  //bot.sendMessage(chatId, 'Received your message');
});

// Listen for any kind of message. There are different kinds of
// messages.
// bot.on('message', function (msg) {
//   var chatId = msg.chat.id;

//   // send a message to the chat acknowledging receipt of their message
//   // bot.sendMessage(chatId, "Received your message");
// });

bot.notifyAll = function (massage) {
    return chatSetvice.getChats().then(chats => {
        chats.forEach((chat) => {
            bot.sendMessage(chat.chatId, massage);
        });
    });
};

module.exports = bot;