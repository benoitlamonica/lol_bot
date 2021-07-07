const { CommandHandler } = require("../modules/CommandHandler");


module.exports = {
    name: 'all',
    description: 'Voir tous les personnages actuel de Lol',
    execute: (msg, arg) => {
        CommandHandler.sendAllChar(msg);
    }
}