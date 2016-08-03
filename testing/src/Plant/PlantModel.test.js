var PlantModel = require('../../../src/js/components/Plant/PlantModel');

describe('PlantModel', function () {

	beforeEach(function () {
		this.model = new PlantModel();
	});

	afterEach(function () {
		this.model = null;
	});

	it('has the `name` attribute default to an empty string', function () {
	expect(this.model.get('name')).to.equal('');
	});


});
