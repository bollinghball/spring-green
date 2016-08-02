var Backbone = require('backbone');

var PlantListView = require('../Plant/PlantListView');
var PlantDBSearchView = require('../Plant/PlantDBSearchView');
var PlantWaterView = require('../Plant/PlantWaterView');

module.exports = Backbone.View.extend({

	events: {
		'click .add-plant-button': 'handleButtonClick'
	},

	initialize: function (options) {
		this.plants = options.plants;
		this.plantListView = new PlantListView({ collection: this.plants });
		this.plantWaterView = new PlantWaterView({ collection: this.plants });
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
	},

	template: function () {
		return `
			<div class="plant-water-region"></div>
			<div class="plant-list-region">
				<div class="plant-header cf">
					<h3>My Plants</h3>
					<button class="add-plant-button">Add A Plant</button>
				</div>
			</div>
		`;
	},

	handleButtonClick: function () {
		// TODO: Redirect to /plants/create
		Backbone.history.navigate('plants/create', {trigger: true});
	}

});