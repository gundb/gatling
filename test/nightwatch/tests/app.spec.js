/*jslint node: true */
'use strict';

var chai = require('chai');

var timeout = 500

module.exports = {

	'Serve the index.html page': function (browser) {
		var objects = browser.page.objects();

		browser
			.init()
			.waitForElementPresent('body', timeout)

			.getTitle(function(title) {
					this.assert.equal(typeof title, 'string');
					chai.expect(title).to.match(/gatling/i);
			})

		browser.assert.urlContains("index.html")

		objects.assert.elementPresent('@user')

		browser.end()
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
