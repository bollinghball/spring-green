var Backbone = require('backbone');

var PlantModel = require('./PlantModel');
var PlantDBModel = require('./PlantDBModel');
var PlantDBSearchView = require('./PlantDBSearchView');

module.exports = Backbone.View.extend({

	className: 'add-plant',

	events: {
		'click .back-button': 'handleBackClick'
	},

	initialize: function () {
		this.plantDBSearchView = new PlantDBSearchView();
		this.plantDBSearchView.on('select', this.addPlant.bind(this));
	},

	render: function () {
		this.$el.html(this.template());
		this.plantDBSearchView.render();
		this.$('.search-region').append(this.plantDBSearchView.$el);
	},

	template: function () {
		return `
			<button class="back-button">My Plants</button>
			<div class="search-region"></div>
		`;
	},

	addPlant: function (plantDBModel) {
		this.trigger('create', plantDBModel);
	},

	handleBackClick: function () {
		window.history.back();
	}
	
});