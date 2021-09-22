const puppeteer = require('puppeteer');

async function findInternet(){

	//startBrowser();

	const url = "https://giris.turktelekomwifi.com/#/welcomeAdsl";
	
	const browser = await puppeteer.launch({
		headless: true,
		defaultViewport: null
	});

	const page = await browser.newPage();

	await page.goto(url,{
		waitUntil: "domcontentloaded"
	});

	//navigateSite(page);

	//fillForm(page);	

	showQuota(page);

	//exitAccount(page);

}

/* async function startBrowser(){

} */


async function navigateSite(page){

}

async function fillForm(page){

}

async function exitAccount(page){
	const exitButton = "data-autamation=\"cikis\"";

}


async function showQuota(page) {

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

findInternet();