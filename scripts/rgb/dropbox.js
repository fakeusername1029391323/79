"use strict";

// Dropbox wrapper for RGB
// Dropbox's API turned out to be simple enough to make this file is pretty unnecessary

function rgbDropbox (authStateHandler, authErrorCallback) {
	var DROPBOX_KEY_ENCODED		= 'bGcXVopGNjA=|d23bVr4Ev06ssMAWOz0gI4b9w/K6or0jgss5aS65tg==';

	this.client = new Dropbox.Client({
		key: DROPBOX_KEY_ENCODED,
		sandbox: true	});
	this.client.authDriver(new Dropbox.Drivers.Redirect({
		rememberUser: true	}));
	this.client.authenticate({interactive: false}, function(error, client) {
		if (error) authErrorCallback(error);
		authStateHandler(client.isAuthenticated());
	});
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

rgbDropbox.prototype.list = function (path, callback) {
	this.client.readdir(path, function (error, fileList) {
		if (error) {
			callback(null, error);
		} else {
			callback(fileList, null);
		}
	});
};

rgbDropbox.prototype.load = function (filename, callback) {

	this.client.readFile('/' + filename, {arrayBuffer: true}, function (error, rom) {
		if (error) {
			callback(null, error);
		} else {
			callback(rom, null);
		}
	});
}

rgbDropbox.prototype.save = function (filename, data, callback) {
	this.client.writeFile('/' + filename, data, function (error, stat) {
		if (error) {
			callback(null, error);
		} else {
			callback(data, null);
		}
	});
}