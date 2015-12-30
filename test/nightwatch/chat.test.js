/*jslint node: true */
'use strict';

// use chai's expect().to.be library
var expect = require('chai').expect;

module.exports = {

	'Serve the index.html page': function (browser) {
		browser.url('localhost:4242')
			.waitForElementVisible('body', 500);

		browser.getTitle(function (title) {
			expect(title).to.match(/gun/i);
		});

		browser.end();
	}
};
