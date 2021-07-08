const { ApiHandler } = require('./ApiHandler');
const { StringHelper } = require('./StringHelper');
const { Utils } = require('../vendor/utils/Utils');
const moduleData = require('./data');
const CMD_PREFIX = process.env.COMMAND_PREFIX;

class CommandHandler {

    static sendHelpMessage = (msg) => {
        let reply = Utils.embed('Liste des commandes')
            .setThumbnail(moduleData.appIcon)
            .setDescription(`Toutes les commandes doivent commencer par ${CMD_PREFIX}`)
            .addField(
                '------------------------------------------------------------------------',
                '----------------------------------------------------------------------');

        let cmds = require('../commands');
        Object.keys(cmds).forEach(key => {
            reply.addField(cmds[key].name, cmds[key].description, false);
        })
        msg.channel.send(reply);
    }

    static sendSpecificChar = (msg, char) => {

        if (char === undefined) {
            msg.reply(`Tu n'as pas spécifié de champions ! (ex : "!lb find nunu")`);
            return;
        }

        let charProper = StringHelper.capitaliseFirstLetter(char);
        ApiHandler.getSpecificChar(charProper).then(rep => {
            let dataRep = rep.data;
            let data = dataRep.data[charProper];
            const reply = Utils.embed(data.id)
                .setDescription(data.lore)
                .setThumbnail(ApiHandler.getCharImg(charProper))
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
        ApiHandler.getAllChar().then(rep => {
            let champObject = rep.data.data;
            const reply = Utils.embed(`Tous les champions à ce jour (${rep.data.version})`).setThumbnail(moduleData.appIcon);
            let content = ''
            for (let champName in champObject) {
                content += `${champName} \n ------------ \n`;
            }
            reply.setDescription(content);
            msg.channel.send(reply);
        }).catch(err => {
            console.log(err);
            msg.reply(`Erreur lors de la récupérations des personnages : ${err}`);
        })
    }

    static sendSumInfo = (msg, sum) => {
        ApiHandler.getBestCharBySummoner(sum).then(rep => {
            let data = rep.data;
            let ranking = "Aucuns";
            let rankIcon = "NONE";

            if (Object.keys(data.ranking).length !== 0) {
                ranking = `${data.ranking.tier} ${data.ranking.rank}`;
                rankIcon = data.ranking.tier
            }

            let reply = Utils.embed(data.sumInfo.name).setThumbnail(ApiHandler.getSummonerRankingImg(rankIcon))
                .addField('Niveau', data.sumInfo.summonerLevel, false)
                .addField('Classement', ranking, false)
                .addField('Meilleur champion', data.bestChamp.info.id, false)
                .addField('Niveau de maitrise', data.bestChamp.mastery, true)
                .addField('Points', data.bestChamp.points, true)
                .setImage(ApiHandler.getCharImg(data.bestChamp.info.id));

            msg.channel.send(reply);

        }).catch(err => {
            console.log(err);
            msg.reply(`Invocateur ${sum} non trouvé ! 😅`);
        })
    }

    static sendCharRotation = (msg) => {
        ApiHandler.getCharRotation().then(rep => {
            let freeChampForRegularPlayers = rep.data.rPlayers;
            let freeChampForNewPlayers = rep.data.fPLayers;
            let reply = Utils.embed('Personnages gratuit cette semaine :').setThumbnail(moduleData.appIcon)
                .addField('Pour les joueurs régulier :', freeChampForRegularPlayers.join(', '), false)
                .addField('Pour les nouveaux joueurs :', freeChampForNewPlayers.join(', '), false);

            msg.channel.send(reply);

        }).catch(err => {
            console.log(err);
            msg.reply(`Une erreur est survenue lors de la recupération de la liste gratuite : ${err}`)
        })
    }
}

exports.CommandHandler = CommandHandler;