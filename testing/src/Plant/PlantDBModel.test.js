var PlantDBModel = require('../../../src/js/components/Plant/PlantDBModel');

describe('PlantDBModel', function () {

	beforeEach(function () {
		this.model = new PlantDBModel();
	});

	afterEach(function () {
		this.model = null;
	});

	it('has the `Common name` attribute default to an empty string', function () {
		expect(this.model.get('Common_Name')).to.equal('');
	});

	it('has the `Moisture Use` attribute default to Medium', function () {
		expect(this.model.get('Moisture_Use')).to.equal('Medium');
	});

	it('has the `Duration` attribute default to an empty string', function () {
		expect(this.model.get('Duration')).to.equal('');
	});

	it('has the `Active Growth Period` attribute default to an empty string', function () {
		expect(this.model.get('Active_Growth_Period')).to.equal('');
	});

	it('has the `Scientific Name` attribute default to an empty string', function () {
		expect(this.model.get('Scientific_Name_x')).to.equal('');
	});

	it('has the `SubClass` attribute default to an empty string', function () {
		expect(this.model.get('SubClass')).to.equal('');
	});

	it('has the `Growth Rate` attribute default to an empty string', function () {
		expect(this.model.get('Growth_Rate')).to.equal('');
	});

	it('has the `Bloom Period` attribute default to an empty string', function () {
		expect(this.model.get('Bloom_Period')).to.equal('');
	});

	it('the value of the function `parse` property is .04', function () {
		this.model.set('Moisture_Use', 'High');
		expect(this.model.getMoistureUse()).to.equal(.04);
	});	



});
