var Backbone = require('backbone');
var PlantModel = require('./PlantModel');

var PlantListItemView = require('./PlantListItemView');

var PlantListView = Backbone.View.extend ({

	className: 'plant-list',

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