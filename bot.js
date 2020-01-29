
//T22 server use

//setup
const Discord = require('discord.js');
var client = new Discord.Client();
const auth = require('./auth.json');


//prefix
const prefix = "/" ;

//startup
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity("Use /help for \"Help\""); //set status 
});

//main responseText 
client.on('message', msg => {
  const channel = msg.guild.channels.find(ch => ch.name === '伺服器後台');
  
  if (msg.content.startsWith (prefix + "adduser") ) {
	msg.channel.send("はい!!" + msg.author.username + "\n正在呼叫管理員，請稍等");
  }
  if (msg.content.startsWith (prefix + "dick")) {
    msg.channel.send("おにちゃんなら...やめるだいよ！:nose:");
  }
  if (msg.content.startsWith (prefix + "hentai")) {
    msg.channel.send("変態！！", {files:["./image/hentai.png"]});
  }

//backstage
  if (msg.channel.id !== '672018541423099924') {
	console.log("\n" + msg.author.username + "-sent: [" + msg + "]  userID: " + msg.author.id) ;
	channel.send("\n" + msg.author.username + "-sent: [" + msg + "]  userID: " + msg.author.id) ; 
  }
  
  //add role
  if (msg.content.startsWith (prefix + "admin")){
	let role = msg.guild.roles.find(r => r.id === "661204886360162323");
	// Let's pretend you mentioned the user you want to add a role to (!addrole @user Role Name):
	let member = msg.mentions.members.first();
	member.addRole(role).catch(console.error);
  }
  
  if (msg.content.startsWith (prefix + "longislandadm")){
	let perms = msg.member.permissions;

	// Check if a member has a specific permission on the guild!
	let has_admin = perms.has("ADMINISTRATOR");
	msg.channel.send(has_admin);
  }
  
  if (msg.content.startsWith (prefix + "checklongisland")){
	msg.channel.send("/longislandadm");
  }
});


/* Create an event listener for new guild members
   the welcome bot main code */
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === '新進人員');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  console.log("${member} added into server") ;
  channel.send(`歡迎來到T22的Discord伺服, ${member}\n\`\`\`md\n#貼心提醒\n[進入伺服要做的][請先查看以下頻道]\n1. <#info>\n2. <#注意事項>\n就醬掰\`\`\``);
});

//login using the bot's token 
client.login(auth.token);