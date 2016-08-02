var Backbone = require('backbone');

var PlantDBCollection = require('./PlantDBCollection');
var PlantDBListView = require('./PlantDBListView');

var PlantDBSearchView = Backbone.View.extend({

	events: {
		'click .search': 'onSearchClick',
		'keyup :input': 'logKey'
	},

	initialize: function () {
		var _this = this;

		this.collection = new PlantDBCollection();
		this.plantDBListView = new PlantDBListView({
			collection: this.collection
		});

		this.plantDBListView.on('select', function (data) {
			// "bubble" the event up
			_this.trigger('select', data);
		});
	},

	render: function () {
		this.$el.html(this.template());
		this.plantDBListView.render();
		this.$('.list-region').append(this.plantDBListView.el);
	},

	template: function () {
		return `
			<input type="text" class="search-input"><button class="search">Search</button>
			<div class="list-region"></div>
		`;
	},

	onSearchClick: function () {
		var query = this.$('.search-input').val();
		this.collection.search(query);

		this.$('.search-input').val('');
	},

	logKey: function (e) {
		var val = this.$('.search-input').val();
		if (e.keyCode === 13 && val.length > 0) {
			var query = this.$('.search-input').val();
			this.collection.search(query);
		
		this.$('.search-input').val('')
		}
	}	

});

module.exports = PlantDBSearchView;
