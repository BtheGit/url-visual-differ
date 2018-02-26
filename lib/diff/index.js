const puppeteer = require('puppeteer');
const looksSame = require('looks-same');
const sanitizeFilename = require('sanitize-filename');
const fs = require('fs-extra');
const definedDevices = require('puppeteer/DeviceDescriptors');

const defaultSettings = {
    pathPartial: '/',
    basisRoot: 'https://www.cancer.gov',
    comparisonRoot: 'http://localhost:3000',
    outputToFile: false,
    outputPath: 'page',
    tolerance: 10,
    widths: [320, 390, 391, 640, 641, 1024, 1025, 1441],
    height: 1, // using fullpage means this is irrelevant but width without height seems to throw in setViewport
    highlightColor: '#DD3300',
    fullPage: true,
    isMobile: false
}

// ###### UTILITIES

const serializePromises = funcs =>
  funcs.reduce((promise, func) =>
    promise.then(result => func().then(Array.prototype.concat.bind(result))),
    Promise.resolve([]))

const convertPathToFilename = path => {
    const newPath = path.replace(/\//g, '_');
    const sanitized = sanitizeFilename(newPath);
    return sanitized;
}

// ####### MAIN

const getScreenshot = async (url, page) => {
    console.log('[diff] Capturing screenshot')
    await page.goto(url);
    const screenshot = await page.screenshot({
        fullPage: true,
    });
    return screenshot;
}

const diffTwoImages = async (page, width, settings) => {

    const {
        basisRoot,
        comparisonRoot,
        pathPartial,
        outputPath,
        highlightColor,
        tolerance,
        outputToPath
    } = settings;
    // get Promise<Buffer>
    const img1 = await getScreenshot(`${basisRoot}${pathPartial}`, page)
    const img2 = await getScreenshot(`${comparisonRoot}${pathPartial}`, page)

    // Either write the results to disk or return an Image Buffer
    if(outputToPath) {
        await looksSame.createDiff({
            reference: img1,
            current: img2,
            diff: `output/${outputPath}__${width}.png`,
            highlightColor,
            tolerance
        }, (err) => {})
        return null;  
    }
    else {
        // To capture the callback output in a promise
        const output = await new Promise(async (resolve, reject) => {
            await looksSame.createDiff({
                reference: img1,
                current: img2,
                highlightColor,
                tolerance
            }, (err, result) => {
                const resultObj = {
                    img1,
                    img2,
                    result,
                    settings,
                    width
                }
                resolve(resultObj)
            })
        })
        return output;
    }
}

const generateDiffFiles = async (customSettings = {}) => {
    console.log('[diff] Initialized')
    if(customSettings.pathPartial && !customSettings.outputPath) {
        customSettings.outputPath = convertPathToFilename(customSettings.pathPartial);
    }
    const options = Object.assign({}, defaultSettings, customSettings);
    const {
        widths,
        height,
        outputToFile
    } = options;

    if(outputToFile) {
        // Set up folder structure
        const outputDirectory = './output'
        fs.emptyDirSync(outputDirectory);
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // We need to convert the array of widths into a serialized promise chain
    const promises = widths.map(width => async () => {
        if(typeof width === 'string' && definedDevices.hasOwnProperty(width)) {
            await page.emulate(definedDevices[width]);
        }
        else if (typeof width === 'number' && width === width) {
            await page.setViewport({
                width,
                height
            });
        }
        return await diffTwoImages(page, width, options);
    })

    // For now, cheap Error handling. Catch all server errors, such as timeouts. No partial results when error.
    try {
        const results = await serializePromises(promises);
        console.log('[diff] Done');
        await browser.close();
        return results;
    }
    catch(err) {
        await browser.close();
        throw new Error(err)
    }

}

module.exports = generateDiffFiles;