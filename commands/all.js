const { ApiHandler } = require("../modules/ApiHandler")

module.exports = {
    name: 'all',
    description: 'Voir tous les personnages actuel de Lol',
    execute: (msg, arg) => {
        ApiHandler.sendAllChar(msg);
    }
}