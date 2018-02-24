const router = require('express').Router();
const diffPage = require('../lib/diff');

router.post('/diff', async (req,res) => {
    // await diffPage(req.body);


    res.setHeader('Content-Type', 'application/json');
    res.send(req.body)
})

module.exports = router;