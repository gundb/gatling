/*globals describe, it, expect, username */

describe('Gatling', function () {
	'use strict';

	it('should check localStorage for user', function () {
		localStorage.clear();
		var usernameExists = username.exists();
		expect(usernameExists).to.be(false);
	});

});
