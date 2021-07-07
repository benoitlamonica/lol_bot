const { ApiHandler } = require("../modules/ApiHandler");
const { StringHelper } = require("../modules/StringHelper");

module.exports = {
    name: 'find',
    description: 'Trouve le champion dans l\'api de LoL, préciser le champion après "find" (ex: !lb find nunu)',
    execute: (msg, char) => {
        ApiHandler.sendProperMessage(msg, char);
    }
}