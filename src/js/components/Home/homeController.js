var Backbone = require('backbone');

var HomeView = require('./HomeView');
var CreatePlantView = require('../Plant/CreatePlantView');
var PlantCollection = require('../Plant/PlantCollection');

var plants = new PlantCollection();

module.exports = {

	showHome: function () {
		plants.fetch();

		var view = new HomeView({
			plants: plants
		});

		Backbone.trigger('app:showView', view);
	},

	showCreate: function () {
		var createView = new CreatePlantView();

		createView.on('create', function (plantDBModel) {
			// Create the plant
			var plant = plants.create({
				plantDBId: plantDBModel.get('id')
			}, {
				success: function () {
					plant.water();
				}
			});

			Backbone.history.navigate('home', { trigger: true});
		});

		Backbone.trigger('app:showView', createView);
	}

};