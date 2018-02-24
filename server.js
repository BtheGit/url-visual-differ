const express = require('express');
const app = express();
const path = require('path');
const PORT = 8080;

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))