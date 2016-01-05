/*globals describe, it, expect, username */

describe('Gatling', function () {
	'use strict';

	describe('username', function () {

		describe('exist', function () {
			it('should check localStorage for existence of a username', function () {
				localStorage.clear();
				var usernameExists = username.exists();
				expect(usernameExists).to.be(false);
			});
		});

		describe('generate', function () {
			// TODO: support alternative generators
			it('should generate a new username', function() {
				username.generate();
				var usernameExists = username.exists();
				expect(usernameExists).to.be(true);
			});
		});

		describe('get', function () {
			it('should generate a new username - when there was no username in localStorage', function() {
				localStorage.clear();
				var alias = username.get();
				expect(alias).to.exist;
				expect(alias).to.not.be.empty;
			});

			it('should use an existing username - when there was a username in localStorage', function() {
				var user = "Night Eyas"
				localStorage.clear();
				localStorage.username = user;
				var alias = username.get();
				expect(alias).to.exist;
				expect(alias).to.equal(user);
			});
		})
	});

});
