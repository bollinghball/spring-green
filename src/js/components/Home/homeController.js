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
		var _this = this;
		var createView = new CreatePlantView();

		createView.on('create', function (plantDBModel) {
			// Create the plant
			_this.createPlant(plantDBModel);
			Backbone.history.navigate('home', { trigger: true});
		});

		Backbone.trigger('app:showView', createView);
	},

	createPlant: function (plantDBModel) {
		var plant = plants.create({
			name: plantDBModel.get('Common_Name'),
			plantDBId: plantDBModel.get('id'),
			img: plantDBModel.get('img')		
		}, {
			success: function () {
				plant.water();
			}
		});
	}

};