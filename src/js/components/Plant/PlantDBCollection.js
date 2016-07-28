var Backbone = require('backbone');

var PlantDBModel = require('./PlantDBModel');
var plantsApi = require('../API/plants');

module.exports = Backbone.Collection.extend({

	model: PlantDBModel,

	url: function () {
		return plantsApi.url(); // e.g. https://plantsdb.xyz/search
	},

	parse: function (response) {
		return response.data;
	},

	search: function (commonName) {
		this.fetch({
			data: {
				Common_Name: commonName
			}
		});
	}

});