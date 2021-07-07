const { Utils } = require('./Utils');

class NonApiHandler {
    static sendHelpMessage = (msg) => {
        let reply = Utils.embed('Liste des commandes')
            .setThumbnail('https://media.melty.fr/article-3927430-so-f5/media.jpg');
        let cmds = require('../commands');
        Object.keys(cmds).forEach(key => {
            reply.addField(cmds[key].name, cmds[key].description, false);
        })
        msg.channel.send(reply);
    }
}

exports.NonApiHandler = NonApiHandler;