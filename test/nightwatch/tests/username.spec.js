/*jslint node: true */
'use strict';

var chai = require('chai');

var timeout = 500

module.exports = {

	'Get the user id - no username exists in localStorage': function (browser) {
		var objects = browser.page.objects();

		browser
			.init().execute(function () {
				localStorage.clear();
				console.log('Yo!'); // TODO: override browser execute console.log
			})
			.refresh()

		objects.assert.elementPresent('@user')

		objects.expect.element('@user').value.to.match(/\S/)

		browser.end();
	},

	'Get the user id - username exists in localStorage': function (browser) {
		var objects = browser.page.objects();

		var username = 'the Most Awesome Nighthawk (aka the MAN)';

		browser
			.init().waitForElementVisible('body', timeout);

		browser
			.execute(function (value) {
					localStorage.username = value;
				}, [username])
			.refresh()

		objects.assert.elementPresent('@user')
		objects.assert.value('@user', username)

		browser.end();
	},

	'User edits to the username persist': function (browser) {
		var objects = browser.page.objects();

		var username = 'Ned the Nighthawk';

		// randomly generated a username
		browser.init()
			.execute(function () {
				localStorage.clear();
			})
			.refresh()
		objects.waitForElementVisible('@user', timeout)

		// ensure a username exists and isn't the test value
		objects.assert.elementPresent('@user')

		objects.expect.element('@user').to.be.present

		objects.expect.element('@user').value.to.match(/\S/)

		objects.expect.element('@user').value.to.not.equal(username)

		// simulate user modifying their username then exiting the input
		objects
			.clearValue('@user') // failure to clear will cause concatenation
			.setValue('@user', username)   // input edited username
			.setValue('@user', browser.Keys.TAB) // leave field to actually set it

		browser.refresh() // should now be set to user's edited value
		
		// ensure edited username is retained
		objects.waitForElementVisible('@user', timeout)
			
		objects.expect.element('@user').value.to.equal(username)

		browser.end();

	}
};