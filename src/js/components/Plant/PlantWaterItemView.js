var Backbone = require('backbone');
var PlantWaterView = require('./PlantWaterView');

module.exports = Backbone.View.extend({

	events: {
		'click .water': 'onWaterClick'
	},

	initialize: function () {
		this.render = this.render.bind(this)
	},

	render: function () {
		var data = {
			name: this.model.get('name')
		};
		this.$el.html(this.template(data));
	},

	template: function (data) {
		return `
			<h3>${data.name}</h3>
			<button class="water">Water</button>
		`;
	},

	onWaterClick: function () {
		this.model.water();
	}

});