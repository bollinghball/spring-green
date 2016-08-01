var Backbone = require('backbone');
var PlantWaterItemView = require('./PlantWaterItemView');

module.exports = Backbone.View.extend({

	className: 'water-list',

	events: {
		'click .water-all': 'onWaterAllClick'
	},

	initialize: function () {
		this.render = this.render.bind(this);
		this.listenTo(this.collection, 'update change', this.render);
	},

	render: function () {
		var _this = this;

		this.$el.html(this.template());

		if (this.childViews) {
			this.childViews.forEach(function (view){
				view.remove();
			});
		}

		this.childViews = this.collection.map(function (plant) {
			var listItemView = new PlantWaterItemView({
				model: plant
			});
			return listItemView;
		});

		this.childViews.forEach(function (view) {
			view.model.getHealth(function (health) {
				if (health < 80) {
					// Only show if at least one of the models is less than
					// the water threshold.
					_this.show();
					view.render();
					_this.$el.append(view.$el);
				}
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
		this.collection.forEach(function (model) {
			model.getHealth(function (health) {
				if (health < 80) {
					model.water();
				}
			});
		});
		this.render();
	},

	show: function () {

		this.$el.addClass('visible');
	}

});