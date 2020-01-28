const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '/adduser') {
    msg.reply('好滴\n正在呼喚管理員\n老公~~有人在叫你啦');
  }
});


client.login(auth.token);