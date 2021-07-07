const { NonApiHandler } = require("../modules/NonApiHandler")

module.exports = {
    name: 'help',
    description: 'Liste de toutes les commandes',
    execute: (msg, arg) => {
        NonApiHandler.sendHelpMessage(msg);
    }
}