const puppeteer = require("puppeteer");

(async () => {
	const url = "https://en.wikipedia.org/wiki/English_language";
	
	const browser = await puppeteer.launch({
		headless: true,
		defaultViewport: null
	});
	const page = await browser.newPage();
	

	await page.goto(url,{
		waitUntil: "domcontentloaded"
	});

	await browser.close();
})();

