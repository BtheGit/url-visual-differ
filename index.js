const puppeteer = require('puppeteer');
const looksSame = require('looks-same');

const getScreenshot = async (url, page) => {
    await page.goto(url);
    const screenshot = await page.screenshot({
        fullPage: true,
    });
    return screenshot;
}


const createDiff = async ({
    pathPartial = '/',
    basisPath = 'https://www.cancer.gov',
    altPath = 'localhost:3000',
    outputPath = 'diff',
    tolerance = 5,
    width = 1025,
    height = 1,
    highlightColor = '#DD3300'
}) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setViewport({
        width,
        height
    })
    const img1 = await getScreenshot(`${basisPath}${pathPartial}`, page, 'img1.png')
    const img2 = await getScreenshot(`${altPath}${pathPartial}`, page, 'img2.png')

    await looksSame.createDiff({
        reference: img1,
        current: img2,
        diff: `${outputPath}.png`,
        highlightColor,
        tolerance
    }, (err) => {})    
    await browser.close();
}


createDiff({
    altPath: 'https://www-red-dev.cancer.gov',
    tolerance: 10,
    pathPartial: '/about-cancer/treatment/clinical-trials/search',
    width: 1024
});