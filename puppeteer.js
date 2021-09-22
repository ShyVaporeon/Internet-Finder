const puppeteer = require('puppeteer');


async function Start_Browser() {
	const browser = await puppeteer.launch({
		headless: false,
		defaultViewport: null
	});

	const page = await browser.newPage();
	
	const url = "https://giris.turktelekomwifi.com/#/welcomeAdsl";

	await page.goto(url,{
		waitUntil: "domcontentloaded"
	});	

	const quota_remainging = ".table tbody tr td:first-child"
	const quota_total = ".table tbody tr td:nth-child(2)"
	await page.waitForSelector(quota_total, {
		visible: true,
	  });


	const Message1 =  await page.$eval(quota_total, result => result.textContent);
	const Message2 =  await page.$eval(quota_remainging, result => result.textContent);
	console.log("Quota: "+Message1);
	console.log("Remaining: "+Message2);
}

Start_Browser();