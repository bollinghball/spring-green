var Backbone = require('backbone');

var PlantModel = require('./PlantModel');
var auth = require('../Auth/authController');

module.exports = Backbone.Collection.extend({

	model: PlantModel,

	url: function () {
		// e.g. /users/ab-123-cd/plants
		return '/users/' + auth.userModel.get('id') + '/plants';
	},

	getUnwateredPlants: function (callback) {
		var _this = this;
		var count = 0;
		var results = [];

		if (this.length === 0) {
			callback(results);
			return;
		}

		// Get the health of each plant. If the plant is lower than 
		// 40%, add it to the results. If count === this.length,
		// we know that we have checked all plants.
		this.each(function (plantModel) {
			plantModel.getHealth(function (health) {
				count++;

				if (health < 80) {
					results.push(plantModel);
				}

				if (count === _this.length) {
					callback(results);
				}
			});
		});
	}

});