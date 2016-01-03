/*globals describe, it, expect, username */

describe('Gatling', function () {
	'use strict';

	it('should check localStorage for username', function () {
		localStorage.clear();
		var usernameExists = username.exists();
		expect(usernameExists).to.be(false);
	});

	it('should generate username', function() {
		username.generate();
		var usernameExists = username.exists();
		expect(usernameExists).to.be(true);
	});

});
