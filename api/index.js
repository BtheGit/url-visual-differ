const router = require('express').Router();

router.get('*', (req,res) => {
    res.send({message: 'I am a Banana!'})
})

module.exports = router;