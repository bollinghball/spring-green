var Backbone = require('backbone');

var PlantModel = require('./PlantModel');
var auth = require('../Auth/authController');

module.exports = Backbone.Collection.extend({

	model: PlantModel,

	url: function () {
		// e.g. /users/ab-123-cd/plants
		return '/users/' + auth.userModel.get('id') + '/plants';
	}

});