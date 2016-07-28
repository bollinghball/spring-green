var Backbone = require('backbone');
var PlantModel = require('./PlantModel');
var PlantDBModel = require('./PlantDBModel');

var PlantListItemView = Backbone.View.extend({

	initialize: function () {
		this.listenTo(this.model.plantDBModel, 'sync', this.render.bind(this));
	},

	render: function () {
		var _this = this;
		var data = {
			commonName: this.model.plantDBModel.get('Common_Name'),
			timeLastWatered: this.model.get('timeLastWatered')
			// thumbnail: from a premade gallery
		};
		
		this.$el.html(this.template(data));

		this.model.getHealth(function (health) {
			_this.$('.health').text(health);
		});

	},

	template: function (data) {
		return `
			<div>Common Name: ${data.commonName}</div>
			<div>timeLastWatered: ${data.timeLastWatered}</div>
			<div class="health"></div>
		`;
	}

});

module.exports = PlantListItemView;