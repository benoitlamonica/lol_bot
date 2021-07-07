const { CommandHandler } = require("../modules/CommandHandler");

module.exports = {
    name: 'find',
    description: 'Trouve le champion dans l\'api de LoL, préciser le champion après "find" (ex: !lb find nunu)',
    execute: (msg, char) => {
        CommandHandler.sendSpecificChar(msg, char);
    }
}