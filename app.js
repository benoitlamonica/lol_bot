const { default: axios } = require('axios');
const Express = require('express');
const app = Express();
const port = 1991;
const champion = "Lulu"

app.listen(port, () => {
    console.log(`Running on port ${port}`);
    axios.get(`https://ddragon.leagueoflegends.com/cdn/11.13.1/data/fr_FR/champion/${champion}.json`).then(rep => console.log(rep.data));
})

app.get('/', (req, res) => {
    res.send('Hello World !');
    console.log(req);
})

