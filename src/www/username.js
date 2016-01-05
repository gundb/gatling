/*global Gun, $*/

var username;

(function () {
	'use strict';

	username = {

		// check to see if the username exists
		exists: function () {
			return Boolean(localStorage.username);
		},

		// build a username
		generate: function () {
			localStorage.username = Gun.text.random(6);
			return localStorage.username;
		},

		// return a username
		get: function () {

			if (!username.exists()) {
				var alias = username.generate();
				localStorage.username = alias;
			}

			return localStorage.username;
		},

		// edit a username
		save: function (newName) {
			localStorage.username = newName;
			return localStorage.username;
		}

	};

	if (typeof $ === 'function') {
		username.input = $('#who');
	}

}());
