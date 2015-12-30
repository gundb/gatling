/*jslint node: true */
'use strict';

module.exports = {
	'Testing the test test': function (browser) {

		browser.url('http://google.com').waitForElementVisible('body', 500);

		browser.expect.element('body').to.be.visible;

		browser.end();
	}
};
