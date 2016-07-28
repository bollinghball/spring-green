// PlantDBListView could pass a callback function into each
// PlantDBListItemView it creates. The PlantDBListItemViews
// will execute that callback function when clicked.

var Backbone = require('backbone');

var PlantDBListItemView = require('./PlantDBListItemView');

var PlantDBListView = Backbone.View.extend({

	className: 'db-list',

	initialize: function () {
		// ensure onListItemClick is bound to this instance
		this.onListItemClick = this.onListItemClick.bind(this);
		this.collection.on('update', this.render.bind(this));
	},

	render: function () {
		var _this = this;

		if (this.childViews) {
			this.childViews.forEach(function (view){
				view.remove();
			});
		}

		this.childViews = this.collection.map(function (plantDBModel) {

			var listItemView = new PlantDBListItemView({
				model: plantDBModel,
				onClick: _this.onListItemClick
			});

			return listItemView;

		});

		this.childViews.forEach(function (view) {
			view.render();
			_this.$el.append(view.$el);
		});
	},

	onListItemClick: function (data) {
		this.trigger('select', data);
	}

});

module.exports = PlantDBListView;
