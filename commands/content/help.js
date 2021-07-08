const { CommandHandler } = require("../../modules/CommandHandler")

module.exports = {
    name: 'help',
    description: 'Liste de toutes les commandes',
    execute: (msg, arg) => {
        CommandHandler.sendHelpMessage(msg);
    }
}