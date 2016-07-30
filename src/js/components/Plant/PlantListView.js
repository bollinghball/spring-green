var Backbone = require('backbone');
var PlantModel = require('./PlantModel');

var PlantListItemView = require('./PlantListItemView');

var PlantListView = Backbone.View.extend ({

	className: 'plant-list',

	initialize: function () {
		this.render = this.render.bind(this);
		this.listenTo(this.collection, 'update', this.render);
	},

	render: function () {
		var _this = this;

		if (this.childViews) {
			this.childViews.forEach(function (view){
				view.remove();
			});
		}

		this.childViews = this.collection.map(function (plant) {
			var listItemView = new PlantListItemView({
				model: plant
			});
			return listItemView;
		});

		this.childViews.forEach(function (view) {
			view.render();
			_this.$el.append(view.$el);
		})
	}

});

module.exports = PlantListView;