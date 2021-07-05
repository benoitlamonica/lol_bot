const Express = require('express');
const app = Express();
const port = 1991;

app.listen(port, () => {
    console.log(`Running on port ${port}`);
})

app.get('/', (req, res) => {
    res.send('Hello World !');
    console.log(req);
})

