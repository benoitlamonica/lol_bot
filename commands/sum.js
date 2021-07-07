const { CommandHandler } = require("../modules/CommandHandler")

module.exports = {
    name: 'sum',
    description: 'Voir le profil d\'un Invocateur, précisez le nom d\'invocateur (ex: !lb sum bingobenich)',
    execute: (msg, arg) => {
        CommandHandler.sendSumInfo(msg, arg);
    }
}