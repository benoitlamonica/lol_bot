// Created by the god Benoit Lamonica on the Invalid Date

const { CommandHandler } = require("../../modules/CommandHandler")

module.exports = {
    name: 'rotation',
    description: 'Affiche la rotation des champions de la semaine',
    execute: (msg, arg) => {
        CommandHandler.sendCharRotation(msg);
    }
}