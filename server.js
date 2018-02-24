const app = require('express')();
const path = require('path');
const PORT = 8080;
const api = require('./api')

app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))