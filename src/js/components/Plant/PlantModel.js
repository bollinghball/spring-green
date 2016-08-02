// Every PlantModel has a last time watered attribute that we then compare to the
// current date, make a request to the Wunderground API to get the avg temp in that
// range, and use the results to update the health attribute.
// 
// PlantModel attributes {
// 		image: String,
// 		timeLastWatered: Number, (e.g. 1469300696725)
// 		health: Number (e.g. 100)
// }
// 
// updateHealth will make a request to Wunderground using this.get('timeLastWatered')
// and the current date.
// 
// 	e.g.
// 		var start = moment(this.get('timeLastWatered')).format('MMDD');
// 		var end = moment().format('MMDD');
// 		$.ajax({
// 			url: weatherApi.planner(start, end, 'SC', 'Columbia'),
// 			success: function () {
// 				// get avg temp, calculate health using this.get('moisture_use')
// 				// and update 'health' attribute.
// 			}
// 		})
// 
// 
// 
// PlantModel.prototype.updateHealth() {
// 
// 
// }

var $ = require('jquery');
var moment = require('moment');
var Backbone = require('backbone');
var weather = require('../API/weather');

var PlantDBModel = require('./PlantDBModel');

module.exports = Backbone.Model.extend({

	defaults: {
		name: 'Click Edit to give your plant a name!',
		timeLastWatered: 0,
		healthStatus: 100,
		plantDBId: null,
		messageSent: false
	},

	initialize: function (options) {
		var _this = this;

		this.plantDBModel = new PlantDBModel({
			id: options.plantDBId
		});

		this.plantDBModel.fetch({
			success: function () {
				_this.trigger('dbModelLoaded', _this);

				if (_this.collection) {
					_this.collection.trigger('dbModelLoaded', _this);
				}
			}
		});
	},

	getHealth: function (callback) {
		var timeSinceLastWatering = (new Date().getTime() - this.get('timeLastWatered')) / 1000 / 60 / 60;
		var moistureUse = this.plantDBModel.getMoistureUse();

		var startDate = moment(this.get('timeLastWatered')).format('MMDD'); // 0726
		var endDate = moment(new Date().getTime()).format('MMDD');

		weather.getAvgTemp(startDate, endDate, function(avgTemp) {
			var health = 100 - (timeSinceLastWatering * avgTemp * moistureUse);
			// Minimum lower limit
			if (health < 0) {
				health = 0;
			}
			callback(Math.ceil(health));
		});
	},

	water: function () {
		this.set('timeLastWatered', new Date().getTime());
		this.save();
		Backbone.trigger('water', this);
	},

	getImage: function () {
		if (this.plantDBModel.get('SubClass') === 'Asteridae') {
			return 'assets/images/asteridae.png';
		} else if (this.plantDBModel.get('SubClass') === 'Alismatidae') {
			return 'assets/images/alismatidae.png';
		} else if (this.plantDBModel.get('SubClass') === 'Arecidae') {
			return 'assets/images/arecidae.png';
		} else if (this.plantDBModel.get('SubClass') === 'Caryophyllidae') {
			return 'assets/images/caryophyllidae.png';
		} else if (this.plantDBModel.get('SubClass') === 'Commelinidae') {
			return 'assets/images/commelinidae.png';
		} else if (this.plantDBModel.get('SubClass') === 'Dilleniidae') {
			return 'assets/images/dilleniidae.png';
		} else if (this.plantDBModel.get('SubClass') === 'Hamamelidae') {
			return 'assets/images/hamamelidae.png';
		} else if (this.plantDBModel.get('SubClass') === 'Liliidae') {
			return 'assets/images/liliidae.png';
		} else if (this.plantDBModel.get('SubClass') === 'Magnoliidae') {
			return 'assets/images/magnoliidae.png';
		} else if (this.plantDBModel.get('SubClass') === 'Rosidae') {
			return 'assets/images/rosidae.png';
		} else {
			return 'assets/images/generic.png';
		}
	}

});