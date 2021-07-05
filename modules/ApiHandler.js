require('dotenv').config();
const { default: axios } = require("axios");
const Discord = require('discord.js');
const VERSION = process.env.CLIENT_VERSION

class ApiHandler {
    static sendProperMessage = ({ msg, char }) => {
        axios.get(`https://ddragon.leagueoflegends.com/cdn/${VERSION}/data/fr_FR/champion/${char}.json`).then(rep => {
            let dataRep = rep.data;
            let data = dataRep.data[char];
            const reply = new Discord.MessageEmbed()
                .setColor('#8558fb')
                .setTitle(data.id)
                .setDescription(data.lore)
                .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/${VERSION}/img/champion/${char}.png`)
                .addField('\u200b', '\u200b')
                .addField('Tips', ...data.allytips, true)
                .addField('\u200b', '\u200b')
                .addField('Jouer contre', ...data.enemytips, true)
                .addField('\u200b', '\u200b')
                .addField('Type', ...data.tags, true);

            let lastSkin = "";
            data.skins.forEach(skin => {
                reply.setImage(`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${char}_${skin.num}.jpg`);
                lastSkin = skin.name;
            });
            reply.addField('\u200b', '\u200b').addField('Dernier Skin :', lastSkin, false);

            msg.channel.send(reply);

        }).catch(err => {
            console.log(err);
            msg.reply("Ce personnage n'existe pas !")
        });
    }
}

exports.ApiHandler = ApiHandler;