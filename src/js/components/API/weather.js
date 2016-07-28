module.exports = {
	
	base: 'http://api.wunderground.com/api/8dbd9a72297c846c',

	city: 'Columbia',

	state: 'SC',

	planner: function (startDate, endDate) { // MMDDMMDD
		var url = this.base + '/planner_';

		url += startDate + endDate;

		url += '/q/' + this.state + '/' + this.city + '.json';

		return url;
	}

};