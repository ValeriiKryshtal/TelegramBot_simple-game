const telegramApi = require('node-telegram-bot-api')
const token = '5867151673:AAHNKeZyqy49goU6liqFWYG84uiU82KhHfc'
const bot = new telegramApi(token, {polling: true})
const {gameOptions, againOptions} = require('./options')
const charts = {}

const startGame = async (chatId) => {
          await bot.sendMessage(chatId, `Guess number from 0 to 9`)
          const randomNumber = Math.floor(Math.random() * 10)
          charts[chatId] = randomNumber;
          await bot.sendMessage(chatId, 'Guess!', gameOptions)
}

const start = () => {
bot.on('message', async msg => {
     bot.setMyCommands([
          {command: '/start', description: 'Welcome my friend!'},
          {command: '/info', description: 'INFO about you my friend'},
          {command: '/game', description: 'Game will fire up'}
          ]) 
     const text = msg.text;
     const chatId = msg.chat.id;
     if (text === '/start') {
          await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/e3a/876/e3a87689-707f-3495-b94a-8ee96e2538e5/192/1.webp')
          await bot.sendMessage(chatId, `Welcome!`)
     }
     if (text === 'Hrunik') {
          await bot.sendMessage(chatId, `LOVE`)
     }
     if (text === '/info') {
          await bot.sendMessage(chatId, `MOSHAAAAA ${msg.from.first_name} ${msg.from.last_name}`)
          return bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/e3a/876/e3a87689-707f-3495-b94a-8ee96e2538e5/192/1.webp')
     }
     if (text === '/game') {
          return startGame(chatId);
     }
     return bot.sendMessage(chatId, 'I dont understand');
     
})
bot.on('callback_query', msg=> {
          const data  = msg.data;
          const chatId = msg.message.chat.id;
          console.log(charts[chatId]);
          if( data === '/again') {
               return startGame(chatId);
          }
          if( data === charts[chatId]) {
               return bot.sendMessage(chatId, `Congratolations! Your answer correct! Yo chosed number ${charts[chatId]}`, againOptions)
          } else { 
               return bot.sendMessage(chatId, `Your answer incorrect! Yo chosed number ${charts[chatId]}`, againOptions)
          }
     })
}
start()