# Internet Finder
Around 5000 Turk Telekom Wi-Fi hotspots exist all around in Turkey in many hotels, airports etc.
Unused internet accounts can be found with passwords identical to user numbers by trial and error.
This app simply automates the proccess.

## Requirements:
Install to run the app:
- Nodejs
- npm (node package manager)

## Dependencies
You also need to install two dependencies:
- puppeteer
- fs

Dependencies can be installed with "npm install \<package name\>"

## Side Note:
In main.js, a variable named user can be changed to adjust the starting point
	
## Known Bugs:
- First two numbers of user variable is skipped
- [Fixed] Every first user number after successfull login is skipped
- [Fixed] When an account doesnt have any internet available app crashes
