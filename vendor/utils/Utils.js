const Discord = require('discord.js');

class Utils {
    static embed = (title) => {
        const color = '#8558fb';
        return new Discord.MessageEmbed().setTitle(title).setColor(color);
    }
    static formatCmdObj = (file, cmdName) => {
        let newFile = file.replace(/\}/g, '');
        newFile = newFile.replace(/\n/g, '');
        newFile = newFile.replace(/ /g, "");
        newFile += `,${cmdName}:require('./${cmdName}')}`;
        return newFile;
    }
}

exports.Utils = Utils;