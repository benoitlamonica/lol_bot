require('dotenv').config();
const Express = require('express');
const Discord = require('discord.js');
const { StringHelper } = require('./modules/StringHelper');
const { ApiHandler } = require('./modules/ApiHandler');
const bot = new Discord.Client();
const app = Express();
const PORT = process.env.PORT;
const TOKEN = process.env.TOKEN;


//Login to Discord API
bot.login(TOKEN);

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);

    bot.on('ready', () => {
        console.log(`Logged as ${bot.user.tag} !`);
    })
    bot.on('message', msg => {
        if (msg.author.bot) return;
        if (!msg.content.startsWith("!lb")) return;
        let cmd = msg.content.split(" ")[1];
        if (cmd === "all") {
            ApiHandler.sendAllChar(msg);
            return;
        }
        let char = StringHelper.capitaliseFirstLetter(cmd);
        ApiHandler.sendProperMessage(msg, char);
    })

})

