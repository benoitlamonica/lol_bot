require('dotenv').config();
const { default: axios } = require("axios");
const { StringHelper } = require('./StringHelper');
const { Utils } = require('./Utils');
const VERSION = process.env.CLIENT_VERSION

class ApiHandler {

    static sendProperMessage = (msg, char) => {
        let charProper = StringHelper.capitaliseFirstLetter(char);
        axios.get(`https://ddragon.leagueoflegends.com/cdn/${VERSION}/data/fr_FR/champion/${charProper}.json`).then(rep => {
            let dataRep = rep.data;
            let data = dataRep.data[charProper];
            const reply = Utils.embed(data.id)
                .setDescription(data.lore)
                .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/${VERSION}/img/champion/${charProper}.png`)
                .addField('\u200b', '\u200b')
                .addField('Tips', ...data.allytips, true)
                .addField('Jouer contre', ...data.enemytips, true)
                .addField('Type', ...data.tags, true);

            let lastSkin = "";
            data.skins.forEach(skin => {
                reply.setImage(`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${charProper}_${skin.num}.jpg`);
                lastSkin = skin.name;
            });
            reply.addField('\u200b', '\u200b').addField('Dernier Skin :', lastSkin, false);

            msg.channel.send(reply);

        }).catch(err => {
            console.log(err);
            msg.reply("Ce personnage n'existe pas !")
        });
    }

    static sendAllChar = (msg) => {
        axios.get(`http://ddragon.leagueoflegends.com/cdn/${VERSION}/data/fr_FR/champion.json`).then(rep => {
            let champObject = rep.data.data;
            const reply = Utils.embed(`Tous les champions à ce jour (${VERSION})`);
            let content = ''
            for (let champName in champObject) {
                content += `${champName} \n\n`;
            }
            reply.setDescription(content);
            msg.channel.send(reply);
        }).catch(err => {
            console.log(err);
            msg.reply(`Erreur lors de la récupérations des personnages : ${err}`)
        })
    }
}

exports.ApiHandler = ApiHandler;