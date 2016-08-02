var Backbone = require('backbone');

var PlantListView = require('../Plant/PlantListView');
var PlantDBSearchView = require('../Plant/PlantDBSearchView');
var PlantWaterView = require('../Plant/PlantWaterView');

module.exports = Backbone.View.extend({

	className: 'home',

	events: {
		'click .add-plant-button': 'handleButtonClick'
	},

	initialize: function (options) {
		this.plants = options.plants;
		this.plantListView = new PlantListView({ collection: this.plants });
		this.plantWaterView = new PlantWaterView({ collection: this.plants });
		this.listenTo(Backbone, 'water', this.updateSideBar);
		this.listenTo(this.plants, 'dbModelLoaded change update', this.updateSideBar.bind(this));
	},

	render: function () {
		this.$el.html(this.template());

		this.plantListView.render();

		this.$('.header')
			.append(this.plantListView.$el);

		this.$('.plant-list-region')
			.append(this.plantListView.$el);		

		this.plantWaterView.render();

		this.$('.plant-water-region')
			.append(this.plantWaterView.$el);

		this.updateSideBar();
	},

	template: function () {
		return `
			<div class="plant-water-region cf"></div>
			<div class="plant-list-region">
				<div class="plant-header cf">
					<h3>My Plants</h3>
					<button class="add-plant-button">Add A Plant</button>
				</div>
			</div>
		`;
	},

	noPlantsTemplate: function () {
		return `
			<div class="plant-water-region"></div>
			<div class="plant-list-region">
				<div class="plant-header cf">
					<h3>My Plants</h3>
					<h3> Click add a plant, to get started!</h3>
					<button class="add-plant-button">Add A Plant</button>
				</div>
			</div>
		`;
	},

	handleButtonClick: function () {
		// TODO: Redirect to /plants/create
		Backbone.history.navigate('plants/create', {trigger: true});
	},

	noPlants: function (plants) {
		var plants = plants.model
		if (plants.length === 0) {
			this.$el.html(this.noPlantsTemplate());
		}
	},

	updateSideBar: function () {
		var _this = this;
		this.plants.getUnwateredPlants(function (plants) {
			if (plants.length === 0) {
				_this.$('.plant-list-region').addClass('full');
			} else {
				_this.$('.plant-list-region').removeClass('full');
			}
		})
	}

});