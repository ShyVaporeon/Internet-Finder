const fs = require('fs');

/* const content = 'Some more content!';

fs.writeFile(`${__dirname}\\test.txt`, content, { flag: 'a+' }, err => {}); */

const content = 'Some other content!'

fs.appendFile(`${__dirname}\\test.txt`, `\n${content}`, err => {})
fs.appendFile(`${__dirname}\\Accounts.txt`, `\n${content}`, err => {})

console.log("file written successfully");