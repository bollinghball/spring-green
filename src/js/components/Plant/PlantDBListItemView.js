// PlantDBListView could pass a callback function into each
// PlantDBListItemView it creates. The PlantDBListItemViews
// will execute that callback function when clicked.

var Backbone = require('backbone');

var PlantDBListItemView = Backbone.View.extend({

	className: 'container',

	events: {
		'click .add': 'handleClick'
	},

	initialize: function (options) {
		this.onClick = options.onClick;
	},

	render: function () {
		var data = this.model.toJSON();
		this.$el.html(this.template(data));
	},

	template: function (data) {
		return `
			<div class="card">
				<div>Common Name: ${data.Common_Name}</div>
				<div>Scientific Name: ${data.Scientific_Name_x}</div>
				<div>Growth Rate: ${data.Growth_Rate}</div>
				<div>Duration: ${data.Duration}</div>
				<div>Active Growth Period: ${data.Active_Growth_Period}</div>
				<div>Active Bloom Period: ${data.Bloom_Period}</div>
				<button class="add">ADD</button>
			</div>
		`;
	},

	handleClick: function () {
		this.onClick(this.model);
	}

});

module.exports = PlantDBListItemView;
