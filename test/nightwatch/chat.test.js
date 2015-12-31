/*jslint node: true */
'use strict';

// use chai's expect().to.be library
var expect = require('chai').expect;

module.exports = {

	'Serve the index.html page': function (browser) {
		// TODO: universalize the port number
		browser.url('http://localhost:4242')  
			.waitForElementVisible('body', 500);

		browser.getTitle(function (title) {
			expect(title).to.match(/gun/i);
		});

		browser.end();
	},

	'Get the user id - no user in localStorage': function (browser) {
		var username = '#user';

		browser.url('http://localhost:4242')
			.waitForElementVisible('body', 500);

		browser.execute(function () {
			localStorage.clear();
			console.log('Yo!'); // TODO: override browser execute console.log
		});

		browser.refresh( function () {
			browser.expect.element(username).to.be.present;
			browser.expect.element(username).to.match(/\S/);
			browser.end();
		});
	}
};
