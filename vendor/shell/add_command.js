const fs = require('fs');
const { Utils } = require('../utils/Utils');

let cmdName = process.argv[2];
let header = `// Created by the god Benoit Lamonica on the ${new Date().toLocaleDateString('fr-FR')}`

fs.readFile('./vendor/shell/template/command.js', 'utf8', (err, file) => {
    if (err) { console.error(err); return }

    let goodFile = header + '\n\n' + file.replace('****', cmdName);

    fs.writeFile(`./commands/content/${cmdName}.js`, goodFile, (err) => {
        if (err) { console.error(err); return }
        console.info("Command created !");
    });

});

fs.readFile('./commands/index.js', 'utf8', (err, file) => {
    if (err) { console.error(err); return }
    let newFile = Utils.formatCmdObj(file, cmdName);
    fs.writeFile('./commands/index.js', newFile, (err) => {
        if (err) { console.error(err); return }
        console.info("Command linked !");
    })
})

