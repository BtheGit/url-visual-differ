const router = require('express').Router();
const diffPage = require('../lib/diff');

router.post('/diff', async (req,res) => {
    console.log(req.body)
    await diffPage(req.body);


    res.setHeader('Content-Type', 'application/json');
    res.send({message: 'I am a Banana!'})
})

module.exports = router;