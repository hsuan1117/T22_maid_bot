//T22 server use

//setup
const {
    Client,
    RichEmbed
} = require('discord.js');
const Discord = require('discord.js');
var client = new Client;
const auth = require('./auth.json');

//prefix
const prefix = "/";

//startup
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("Use /help for \"Help\""); //set status 
});

//main responseText  
client.on('message', msg => {
    const channel = msg.guild.channels.find(ch => ch.name === '伺服器後台');
    if (msg.content.startsWith(prefix + "dick")) {
        msg.channel.send("おにちゃんなら...やめるだいよ！:nose:");
    }
    if (msg.content.startsWith(prefix + "hentai")) {
        if (msg.channel.id === '676116802996273156' || msg.channel.id === '662621474162606080') {
            msg.channel.send("変態！！", {
                file: ("https://api.ooopn.com/image/beauty/api.php?preventCache="+Date.now())
            });
        } else {
            msg.reply("你這個大變態，我要報警\n\(此指令只適用於18+頻道\)");
        }
    }

    //backstage
    if (msg.channel.id !== '672018541423099924') {
        console.log("\n" + msg.author.username + "-sent: [" + msg + "]  userID: " + msg.author.id);
        channel.send("\n" + msg.author.username + "-sent: [" + msg + "]  userID: " + msg.author.id);
    }

    //adduser
    if (msg.content.startsWith(prefix + "adduser")) {
        mention = msg.mentions.users.first();
        addperson = msg.member;
        if (mention != null) {
            addperson = msg.guild.member(mention);
        }
        msgsplit = msg.content.split(" ", 2);
        rolename = msgsplit[1];
        if (msg.channel.id === "661237842978144311") {
            switch (rolename) {
                case "T22":
                    addUser(addperson, rolename);
                    break;
                case "T21":
                    addUser(addperson, rolename);
                    break;
                case "T20":
                    addUser(addperson, rolename);
                    break;
                case "teacher":
                    addUser(addperson, rolename);
                    break;
                case "testrole":
                    addUser(addperson, rolename);
                    break;
            }
            if (rolename != "T22" && rolename != "T21" && rolename != "T20" && rolename != "teacher" && rolename != "testrole") {
                msg.channel.send("3O_OP　ＥＲＲＯＲ４０４\n找不身分組" + rolename + "，請輸入正確身分組").then(d_msg => d_msg.delete(3000));
                msg.react('⚠️');
                msg.delete(3000);
            }
        } else {
            msg.react('⚠️');
            msg.delete(3000);
            msg.reply("好像錯頻囉OWO").then(d_msg => d_msg.delete(3000));
        }
    }

    //new adduser : cmd : /addUserMsg
    if (msg.content.startsWith(prefix + "addUserMsg")) {
        const embed = new RichEmbed();
        embed.setTitle("選擇你的身分組(屆數)！！");
        embed.setColor(2071184);
        embed.setDescription("哈囉！我是身分組(屆數)選擇機\n如果你是\nT20的－請按 0️⃣\nT21的－請按 1️⃣\nT22的－請按 2️⃣\n變態的－請按 🔞\np.s.再按一次可以取消喔");
        msg.channel.send(embed);
        msg.delete(0);
    }

    if (msg.author.bot) {
        if (msg.embeds) {
            const embedMsg = msg.embeds.find(msg => msg.title === "選擇你的身分組(屆數)！！")
            if (embedMsg) {
                embedMsg.message.react("0️⃣")
                    .then(reaction => reaction.message.react("1️⃣"))
                    .then(reaction => reaction.message.react("2️⃣"))
                    .then(reaction => reaction.message.react("🔞"))
                    .catch(err => console.error);
                return;
            }
        }
    }


    //limit time message
    if (msg.content.startsWith(prefix + "limited")) {
        msgsplit = msg.content.split(" ", 2);
        var limitedtime = msgsplit[1] * 1000;
        msg.delete(limitedtime);
    }
    //random msg
    if (msg.content.includes("早安")) {
        var max = 5,
            min = 1;
        var rnd = Randomize(max, min);
        switch (rnd) {
            case 1:
                msg.channel.send("はい!!");
                break;
            case 2:
                msg.channel.send("morning!!");
                break;
            case 3:
                msg.channel.send("O3Ob");
                break;
            case 4:
                msg.channel.send("O_OP");
                break;
            case 5:
                msg.channel.send("おはいよう!!");
                break;
        }
    }

    // /help
    if (msg.content.startsWith(prefix + "help")) {
        helptask = msg.content.split(" ", 2);
        helpcmd = helptask[1];
        if (helpcmd == null) {
            msg.reply("這裡有所有主人您可以對我下達的指令\n```md\n[/help][開啟這個表單]\n[/adduser][加入身分組]只適用於<#申請>頻道\n[/limited][發送一則限時訊息]\n[/hentai][傳送一張隨機車圖]只適用於<#申請>頻道\n#更多訊息請打/help {指令名稱}\n```").then(d_msg => d_msg.delete(5000));
            msg.delete(5000);
        } else {
            switch (helpcmd) {
                case "adduser":
                    msg.reply("還敢問啊冰鳥\n在#info頻道都有說啦！自己去看 O~~w~~OP").then(d_msg => d_msg.delete(5000));
                    msg.delete(5000);
                    break;
                case "limited":
                    msg.reply("limited指令很神奇ww，他可以在設定的時間後自動刪除訊息，無須手動RR，訊息模板如下\n```md\n/limited <秒數> <訊息>\n```").then(d_msg => d_msg.delete(5000));
                    msg.delete(5000);
                    break;
                case "hentai":
                    msg.reply("明明自己就會，変態先生").then(d_msg => d_msg.delete(5000));
                    msg.delete(5000);
                    break;
            }
        }
    }



    /*functions------------------------------------------------------------------------------------------------------------------------------------------*/
    //message edit 
    function msgEdit(msg, text) {
        msg.edit(text)
    }
    //adduser
    function addUser(addperson, rolename) {
        msg.channel.send("はい!! " + addperson + "\n正在增加大人您至身分組" + rolename + "，請稍等").then(d_msg => d_msg.delete(1000));
        let role = msg.guild.roles.find(r => r.name === rolename);
        let member = addperson;
        member.addRole(role).catch(console.error);
        Sleep(2000);
        msg.channel.send("完畢!! " + addperson + "\n已將大人您新增至身分組" + rolename + " OwOb").then(d_msg => d_msg.delete(3000));
        msg.react('☑️');
    }
    //sleep
    function Sleep(msc) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > msc) {
                break;
            }
        }
    }
    //random
    function Randomize(max, min) {
        var rnd = Math.floor(Math.random() * max) + min;
        return rnd;
    }
    /*---------------------------------------------------------------------------------------------------------------------------------------------------*/
});

//addUserMsg
client.on('messageReactionAdd', (reaction, user) => {
    if (user.bot)
        return;

    var member = reaction.message.guild.members.find(member => member.id === user.id);
    var rolename = reaction.emoji.name;

    if (rolename === "🔞") {
        if (member.roles.has("676117026271395846")) { //hentai
            member.removeRole("676117026271395846").catch(err => console.error);
            reaction.remove(member);
        } else {
            member.addRole("676117026271395846").catch(err => console.error);
            reaction.remove(member);
        }
    } else if (rolename === "0️⃣") {
        if (member.roles.has("672471249653465121")) { //t20
            member.removeRole("672471249653465121").catch(err => console.error);
            reaction.remove(member);
        } else {
            member.addRole("672471249653465121").catch(err => console.error);
            reaction.remove(member);
        }

    } else if (rolename === "1️⃣") {
        if (member.roles.has("661229449450356746")) { //t21
            member.removeRole("661229449450356746").catch(err => console.error);
            reaction.remove(member);
        } else {
            member.addRole("661229449450356746").catch(err => console.error);
            reaction.remove(member);
        }
    } else if (rolename === "2️⃣") {
        if (member.roles.has("661204081830002694")) { //t22
            member.removeRole("661204081830002694").catch(err => console.error);
            reaction.remove(member);
        } else {
            member.addRole("661204081830002694").catch(err => console.error);
            reaction.remove(member);
        }
    }
})


/* Create an event listener for new guild members
   the welcome bot main code */
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === '新進人員');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    console.log("${member} added into server");
    channel.send(`歡迎來到T22的Discord伺服, ${member}\n\`\`\`md\n#貼心提醒\n[進入伺服要做的][請先查看以下頻道]\n1. <#info>\n2. <#注意事項>\n就醬掰\`\`\``);
});

//login using the bot's token 
client.login(auth.token);
