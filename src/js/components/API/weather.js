var $ = require('jquery');

var results = localStorage.results
	? JSON.parse(localStorage.results)
	: {};

module.exports = window.weather = {
	
	base: 'http://api.wunderground.com/api/8dbd9a72297c846c',

	city: 'Columbia',

	state: 'SC',

	planner: function (startDate, endDate) { // MMDDMMDD
		var url = this.base + '/planner_';

		url += startDate + endDate;

		url += '/q/' + this.state + '/' + this.city + '.json';

		return url;
	},

	results: results,

	getAvgTemp: function (start, end, cb) {
		var _this = this;
		var range = start + end;
		var avgTemp = this.results[range];

		// If there is an existing result for the
		// given range,
		if (avgTemp) {
			// Execute the callback immediately with
			// the result.
			cb(avgTemp);
		} else {
			// Otherwise, make a request to the
			// wunderground API with the start
			// and end dates
			$.ajax({
				url: this.planner(start, end),
				success: function (response) {
					// Calculate the average temp
					var avgHigh = parseInt(response.trip.temp_high.avg.F);
					var avgLow = parseInt(response.trip.temp_low.avg.F);
					avgTemp = (avgHigh + avgLow) / 2;
					// Store the avgTemp in the results
					// object, identified by the range.
					_this.results[range] = avgTemp;
					// Every time we store the avgTemp,
					// we also need to store it in
					// localStorage:
					localStorage.results = JSON.stringify(_this.results);
					// Execute the callback with the
					// avgTemp.
					cb(avgTemp);
				}
			});

		}


	}

};