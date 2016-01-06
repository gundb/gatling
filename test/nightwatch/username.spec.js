/*jslint node: true */
'use strict';

var username = {
	input: '#who'
};

module.exports = {

	'Serve the index.html page': function (browser) {
		// TODO: universalize the port number
		browser.init().waitForElementPresent('body', 500);

		browser.assert.urlContains("index.html");
		browser.expect.element(username.input).to.be.present;

		browser.end();
	},

	'Get the user id - no username exists in localStorage': function (browser) {

		browser.init().execute(function () {
			localStorage.clear();
			console.log('Yo!'); // TODO: override browser execute console.log
		});

		browser.refresh(function () {
			browser.expect.element(username.input).to.be.present;
			browser.expect.element(username.input).value.to.match(/\S/);
			browser.end();
		});
	},

	'Get the user id - username does exist in localStorage': function (browser) {
		username.value = 'the Most Awesome Nighthawk (aka the MAN)';

		browser.init().waitForElementVisible('body', 500);

		browser.execute(function (value) {
			localStorage.username = value;
		}, [username.value]);

		browser.refresh(function () {
			browser.expect.element(username.input)
				.to.be.present;

			browser.expect.element(username.input).value
				.to.equal(username.value);

			browser.end();
		});
	},

	'User edits to the username persist': function (browser) {
		username.value = 'Ned the Nighthawk';

		browser.init()
			.execute(function () {
				localStorage.clear();
			})
			.refresh(function () {
				browser.waitForElementVisible(username.input, 500);

				browser.expect.element(username.input)
					.to.be.present;

				browser.expect.element(username.input).value
					.to.match(/\S/);

				browser.expect.element(username.input).value
					.not.to.equal(username.value);

				// simulate user modifying their username
				browser
					.clearValue(username.input)
					.setValue(username.input, username.value);

			})
			.refresh(function () {
				// should now be set to user's edited value
				browser.waitForElementVisible(username.input, 500);

				browser.expect.element(username.input).value
					.to.equal(username.value);

				browser.end();
			});
	}
};


// // http://stackoverflow.com/a/29502982/4285306
// module.exports = {
//   'Check getting log messages' : function (client) {
//     client
//       .url('http://jsbin.com/rohilugegi/1/')
//       .getLogTypes(function(result) {
//         console.log(result);
//       })
//       .getLog('browser', function(result) {
//         console.log(result);
//       })
//     ;

//     return client;
//   }
// };




// // http://nightwatchjs.org/api#getLog
// this.demoTest = function(client) {
//   this.getLog('browser', function(logEntriesArray) {
//     console.log('Log length: ' + logEntriesArray.length);
//     logEntriesArray.forEach(function(log) {
//        console.log('[' + log.level + '] ' + log.timestamp + ' : ' + log.message);
//      });
//   });
// };
