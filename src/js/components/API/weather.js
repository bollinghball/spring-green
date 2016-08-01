var superagent = require('superagent');
var global;

if (typeof window === 'undefined') {
	global = this;
} else {
	global = window;
}

var results = {};

// Check to see if we can use localStorage
if (global.localStorage) {
	// Check to see if localStorage contains a results object
	if (global.localStorage.results) {
		// Parse it
		results = JSON.parse(global.localStorage.results);
	}
}

module.exports = {
	
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

	queue: [],

	running: false,

	run: function () {
		var _this = this;
		var task = this.queue[this.queue.length - 1];
		
		this.running = true;

		task.req.end(function (err, response) {
			var avgTemp;
			response = JSON.parse(response.text);
			// Calculate the average temp
			var avgHigh = parseInt(response.trip.temp_high.avg.F);
			var avgLow = parseInt(response.trip.temp_low.avg.F);
			avgTemp = (avgHigh + avgLow) / 2;
			// Store the avgTemp in the results
			// object, identified by the range.
			_this.results[task.start + task.end] = avgTemp;
			// Every time we store the avgTemp,
			// we also need to store it in
			// localStorage:
			if (global.localStorage) {
				localStorage.results = JSON.stringify(_this.results);
			}
			// run the callback with the
			// avgTemp.
			task.cb(avgTemp);

			_this.queue.pop();

			if (_this.queue.length > 0) {
				_this.run();
			} else {
				_this.running = false;
			}
		});
	},

	addToQueue: function (task) {
		this.queue.unshift(task);
		if (!this.running) {
			this.run();
		}
	},

	getAvgTemp: function (start, end, cb) {
		var range = start + end;
		var avgTemp = this.results[range];
		var existing = this.queue.find(function (task) {
			return task.start === start && task.end === end;
		});
		var existingCb;

		if (existing) {
			existingCb = existing.cb;
			existing.cb = function () {
				existingCb.apply(null, arguments);
				cb.apply(null, arguments);
			};
			return;
		}

		// If there is an existing result for the
		// given range,
		if (avgTemp) {
			// run the callback immediately with
			// the result.
			cb(avgTemp);
		} else {
			// Otherwise, make a request to the
			// wunderground API with the start
			// and end dates
			this.addToQueue({
				start: start,
				end: end,
				req: superagent.get(this.planner(start, end)),
				cb: cb
			});
		}
	}

};