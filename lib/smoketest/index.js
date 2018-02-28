const puppeteer = require('puppeteer');
const { serializePromises } = require('../../utilities');
const urls = ['https://tracker.nci.nih.gov/', 'http://www.poo.gov/social-media']

const logPageErrors = async (page, path) => {
    try {
        const messages = [];
        page.on('error', (message) => {
            console.log(message)
            messages.push(message);
        })
        await page.goto(path, {
            waitUntil: 'load'
        });
        return messages;
    }
    catch(err) {
        throw err;
    }
}

const initializeSmoketest = async () => {
    console.log('[smoketest] initialized');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const promises = urls.map(url => async () => {
        try {
            const errors = await logPageErrors(page, url);
            return errors;
        }
        catch(err) {
            // We don't want to terminate the whole process, just record the error for the one page
            // More detailed handling later (timeout, etc.)
            return {err: err.message};
        }
         
    })

    try {
        const results = await serializePromises(promises);
        console.log('[smoketest] done')
        console.log({results})
        await browser.close();
        return results;
    }
    catch(err) {
        await browser.close();
        throw err;
    }
} 

module.exports = initializeSmoketest;