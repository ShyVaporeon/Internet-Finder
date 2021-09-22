const puppeteer = require('puppeteer');
//const $ = require('cheerio');

// const url = 'https://www.amazon.com/Sony-Noise-Cancelling-Headphones-WH1000XM3/dp/B07G4MNFS1/';

async function Start_Browser() {
	    const browser = await puppeteer.launch();

}

Start_Browser();