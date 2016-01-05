/*jslint node: true */
'use strict';

// use chai's expect().to.be library
var expect = require('chai').expect;

module.exports = {

	'Serve the index.html page': function (browser) {
		// TODO: universalize the port number
		browser.url('http://localhost:4242')
			.waitForElementVisible('body', 500);

		browser.getTitle( function (title) {
			expect(title).to.match(/gun/i);
		});

		browser.end();
	},

	'Get the user id - no username exists in localStorage': function (browser) {
		var username = '#who';

		browser.url('http://localhost:4242')
			.waitForElementVisible('body', 500);

		browser.execute( function () {
			localStorage.clear();
			console.log('Yo!'); // TODO: override browser execute console.log
		});

		browser.refresh( function () {
			browser.expect.element(username).to.be.present;
			browser.expect.element(username).value.to.match(/\S/);
			browser.end();
		});
	},

	'Get the user id - username does exist in localStorage': function (browser) {
		var username = {
			element: '#who',
			value: 'the Most Awesome Nighthawk (aka the MAN)'
		};

		browser.url('http://localhost:4242')
			.waitForElementVisible('body', 500);

		browser.execute( function (value) {
			localStorage.username = value;
		}, [username.value]);

		browser.refresh( function () {
			browser.expect.element(username.element)
				.to.be.present;

			browser.expect.element(username.element)
				.value.to.equal(username.value);


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
