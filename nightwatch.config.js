/*jslint node: true */
/*
	TODO: nightwatch doesn't
	seem to notice this file.
	Once fixed, make togglable
	between local testing and
	browserstack testing.
*/

var conf = require('nightwatch.json');


/*
	You'll need to "$ export BROWSERSTACK_{var}=var"
	in your terminal before accessing them
	through "process.env".
*/

conf.test_settings['default']
	.desiredCapabilities["browserstack.user"] =
	process.env.BROWSERSTACK_USERNAME;

conf.test_settings['default']
	.desiredCapabilities["browserstack.key"] =
	process.env.BROWSERSTACK_KEY;

module.exports = conf;
