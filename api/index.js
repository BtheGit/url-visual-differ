const router = require('express').Router();
const diffPage = require('../lib/diff');

router.post('*', async (req,res) => {
    console.log(req)
    res.send({message: 'I am a Banana!'})
})

module.exports = router;