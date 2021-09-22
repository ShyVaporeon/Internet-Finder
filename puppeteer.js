const puppeteer = require('puppeteer');
const $ = require('cheerio');

const url = 'https://www.amazon.com/Sony-Noise-Cancelling-Headphones-WH1000XM3/dp/B07G4MNFS1/';

async function configureBrowser() {
	    const browser = await puppeteer.launch();
	    const page = await browser.newPage();
	    await page.goto(url);
	    return page;
}
