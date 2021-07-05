require('dotenv').config();
const Express = require('express');
const Discord = require('discord.js');
const { StringHelper } = require('./modules/StringHelper');
const { ApiHandler } = require('./modules/ApiHandler');
const bot = new Discord.Client();
const app = Express();
const port = 1991;
const TOKEN = process.env.TOKEN;


//Login to Discord API
bot.login(TOKEN);

app.listen(port, () => {
    console.log(`Running on port ${port}`);

    bot.on('ready', () => {
        console.log(`Logged as ${bot.user.tag} !`);
    })
    bot.on('message', msg => {
        if (msg.author.bot) return;
        if (!msg.content.startsWith("!")) return;
        let char = StringHelper.capitaliseFirstLetter(msg.content.slice(1, msg.content.length));
        ApiHandler.sendProperMessage({ msg, char });
    })

})

app.get('/', (req, res) => {
    res.send('Hello World !');
    console.log(req);
})

