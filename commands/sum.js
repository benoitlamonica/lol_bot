const { CommandHandler } = require("../modules/CommandHandler")

module.exports = {
    name: 'sum',
    description: 'Voir le profil d\'un Invocateur',
    execute: (msg, arg) => {
        CommandHandler.sendSumInfo(msg, arg);
    }
}