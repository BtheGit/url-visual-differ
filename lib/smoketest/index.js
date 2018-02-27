const puppeteer = require('puppeteer');

const initializeSmoketest = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await browser.close();
    }
    catch(err) {
        await browser.close();
        throw err;
    }
} 

export default initializeSmoketest;