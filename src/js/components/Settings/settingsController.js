var Backbone = require('backbone');
var auth = require('../Auth/authController');
var SettingsView = require('./SettingsView');

module.exports = {

	showSettings: function () {
		var settings = new SettingsView({
			model: auth.userModel
		});

		Backbone.trigger('app:showView', settings);

	}
}