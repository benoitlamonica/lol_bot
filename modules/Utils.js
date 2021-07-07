const Discord = require('discord.js');

class Utils {
    static embed = (title) => {
        const color = '#8558fb';
        return new Discord.MessageEmbed().setTitle(title).setColor(color);
    }
}

exports.Utils = Utils;