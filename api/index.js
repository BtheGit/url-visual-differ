const router = require('express').Router();
const diffPage = require('../lib/diff');

router.post('/diff', async (req,res) => {
    const diffResults = await diffPage(req.body);
    console.log(diffResults)


    res.setHeader('Content-Type', 'application/json');
    res.send(diffResults)
})

module.exports = router;