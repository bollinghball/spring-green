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
			<div class="card-search">
				<div class="plant-info">
					<h5 class="plant-title">Common Name</h5> 
					<h4 class="plant-value">${data.Common_Name}</h4>
				</div>
				<div class="plant-info">
					<h5 class="plant-title">Scientific Name</h5> 
					<h4 class="plant-value">${data.Scientific_Name_x}</h4>
				</div>
				<div class="plant-info">
					<h5 class="plant-title">Growth Rate</h5> 
					<h4 class="plant-value">${data.Growth_Rate}</h4>
				</div>
				<div class="plant-info">
					<h5 class="plant-title">Duration</h5> 
					<h4 class="plant-value">${data.Duration}</h4>
				</div>
				<div class="plant-info">
					<h5 class="plant-title">Active Bloom Period</h5> 
					<h4 class="plant-value">${data.Bloom_Period}</h4>
				</div>
				<button class="add">ADD</button>
			</div>
		`;
	},

	handleClick: function () {
		this.onClick(this.model);
	}

});

module.exports = PlantDBListItemView;
