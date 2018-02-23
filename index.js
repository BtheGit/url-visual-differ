const puppeteer = require('puppeteer');
const looksSame = require('looks-same');
const fs = require('fs');

// Set up folder structure
const outputDirectory = './output'
if (!fs.existsSync(outputDirectory)){
    fs.mkdirSync(outputDirectory);
}

const defaultSettings = {
    pathPartial: '/',
    basisPath: 'https://www.cancer.gov',
    altPath: 'localhost:3000',
    outputPath: 'diff',
    tolerance: 5,
    width: 1025,
    height: 1, // using fullpage means this is irrelevant but width without height seems to throw in setViewport
    highlightColor: '#DD3300',
    fullPage: true,
    //mobile = false
}

const getScreenshot = async (url, page) => {
    await page.goto(url);
    const screenshot = await page.screenshot({
        fullPage: true,
    });
    return screenshot;
}

const diffTwoImages = async (page, {
    basisPath,
    altPath,
    pathPartial,
    outputPath,
    highlightColor,
    tolerance,
}) => {
    const img1 = await getScreenshot(`${basisPath}${pathPartial}`, page, 'img1.png')
    const img2 = await getScreenshot(`${altPath}${pathPartial}`, page, 'img2.png')

    await looksSame.createDiff({
        reference: img1,
        current: img2,
        diff: `output/${outputPath}.png`,
        highlightColor,
        tolerance
    }, (err) => {})    

}

const createDiff = async (customSettings) => {
    const options = Object.assign({}, defaultSettings, customSettings);
    const {
        width,
        height
    } = options;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width,
        height
    })

    await diffTwoImages(page, options);

    await browser.close();
}


createDiff({
    altPath: 'https://www-red-dev.cancer.gov',
    tolerance: 10,
    pathPartial: '/about-cancer/treatment/clinical-trials/search',
});