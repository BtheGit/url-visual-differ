const router = require('express').Router();
const diffPage = require('../lib/diff');
const definedDevices = require('puppeteer/DeviceDescriptors');


// Verbose but hopefully easier for whoever is grinding through this to grok
// We only want to accept reasonable device widths or valid device presets 
// (which are defined in puppeteer's source code)
const validateWidths = widths => {
    const arr = widths.split(',')
    const filtered = arr.reduce((prev, el) => {
        const trimmed = el.trim();
        if (definedDevices.hasOwnProperty(trimmed)) {
            return [...prev, trimmed]
        }
        else {
            const asNumber = Number(trimmed);
            if(typeof asNumber === 'number' && asNumber === asNumber) {
                if(asNumber > 0 && asNumber < 3000) {
                    return [...prev, Math.round(asNumber)];
                }
                return prev;
            }
            return prev;
        }
    }, [])
    return filtered;   
}

router.post('/diff', async (req,res) => {
    let userSettings = req.body;
    res.setHeader('Content-Type', 'application/json');

    // Data sanitizing
    if(userSettings && userSettings.widths) {
        userSettings = Object.assign({}, userSettings, {widths: validateWidths(userSettings.widths)})
    }
    try {
        const diffResults = await diffPage(userSettings);
        res.send(diffResults)
    }
    catch(err) {
        // Since this is for technical use, we'll send back the unrefactored error messages
        res.send({err: err.message})
    }
})

router.get('/smoketest', async (req, res) => {
    let userData = req.body;
    res.setHeader('Content-Type', 'application/json');
    console.log(req.body)
    try {
        const smoketestResults = await smoketestPages();
        console.log(smoketestResults);
        res.send(smoketestResults);
    }
    catch(err) {
        console.log(err)
        res.send({err: err.message})
    }
})

module.exports = router;