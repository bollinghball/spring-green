var Backbone = require('backbone');
var PlantWaterItemView = require('./PlantWaterItemView');

module.exports = Backbone.View.extend({

	className: 'water-list',

	events: {
		'click .water-all': 'onWaterAllClick'
	},

	initialize: function () {
		this.render = this.render.bind(this);
		this.listenTo(this.collection, 'dbModelLoaded update change', this.render);
	},

	render: function () {
		var _this = this;

		this.$el.html(this.template());

		if (this.childViews) {
			this.childViews.forEach(function (view){
				view.remove();
			});
		}

		this.collection.getUnwateredPlants(function (plants) {
			_this.childViews = plants.map(function (plant) {
				var listItemView = new PlantWaterItemView({
					model: plant
				});
				return listItemView;
			});

			_this.childViews.forEach(function (view) {
				view.render();
				_this.$el.append(view.$el);
			});
		});
	},

	template: function (data) {
		return `
			<h2>Watering Schedule</h2>
			<button class="water-all">Water All</button>
		`;
	},

	onWaterAllClick: function () {
		this.collection.getUnwateredPlants(function (plants) {
			plants.forEach(function (plantModel) {
				plantModel.water();
			});
		});
		this.render();
	}

});