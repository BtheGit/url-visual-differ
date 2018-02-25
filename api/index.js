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

    // Data sanitizing
    if(userSettings && userSettings.widths) {
        userSettings = Object.assign({}, userSettings, {widths: validateWidths(userSettings.widths)})
    }

    const diffResults = await diffPage(userSettings);
    res.setHeader('Content-Type', 'application/json');
    res.send(diffResults)
})

module.exports = router;