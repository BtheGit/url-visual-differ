const router = require('express').Router();

router.get('*', (req,res) => {
    res.send('I am a banana')
})

module.exports = router;