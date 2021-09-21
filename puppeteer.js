const puppeteer = require("puppeteer");
const $ = require("cheerio");

const url = "https://giris.turktelekomwifi.com/#/welcomeAdsl";

async function configureBrowser() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);
	return page;
}

async function checkPrice() {
	await page.reload();
	let html = await page.evaluate(() => document.body.innerHTML);
	console.log(html);
}

async function monitor() {
	let page = await configureBrowser();
	await checkPrice(page);
}
monitor();
