require('dotenv').config();

const Express = require('express');
const Discord = require('discord.js');
const botCommands = require('./commands');

const app = Express();
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const PORT = process.env.PORT;
const TOKEN = process.env.TOKEN;
const CMD_PREFIX = process.env.COMMAND_PREFIX;

Object.keys(botCommands).forEach(key => {
    bot.commands.set(botCommands[key].name, botCommands[key])
});


//Login to Discord API
bot.login(TOKEN);

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);

    bot.on('ready', () => {
        console.log(`Logged as ${bot.user.tag} !`);
    })
    bot.on('message', msg => {

        // Basics check
        if (msg.author.bot) return;
        if (!msg.content.startsWith(CMD_PREFIX)) return;

        // Getting arg of command 1 => Cmd | 2 => Args
        let cmd = msg.content.split(" ")[1];
        let arg = msg.content.split(" ")[2];

        // If command doesn't exist
        if (!bot.commands.has(cmd)) {
            msg.reply(`La commande ${cmd} n'existe pas !`);
            bot.commands.get('help').execute(msg, arg);
            return;
        };

        // Execute command
        try {
            bot.commands.get(cmd).execute(msg, arg);
        } catch (error) {
            console.error(error);
            msg.reply(`Erreur lors de l'exectution de la commande ${cmd} !`)
        }
    })

})

