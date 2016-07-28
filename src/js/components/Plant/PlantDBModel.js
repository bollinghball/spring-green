var Backbone = require('backbone');

var plantsApi = require('../API/plants');

module.exports = Backbone.Model.extend({
	defaults: {
		Common_Name: '',
		Moisture_Use: 'Medium'
	},

	url: function () {
		return plantsApi.url() + '?id=' + this.get('id'); // e.g. https://plantsdb.xyz/search?id=9123
	},

	parse: function (response) {
		// If this model is already part of a collection, it has already been "parsed".
		if (this.collection) {
			return response;
		}

		return response.data[0];
	},

	getMoistureUse: function () {
		var use = this.get('Moisture_Use');
		if (use === 'High') {
			return 0.05;
		} else if (use === 'Low') {
			return 0.007;
		} else {
			return 0.025;
		}
	}

});