var PlantListItemView = require('../../../src/js/components/Plant/PlantListItemView');

describe('PlantListItemView', function () {

	beforeEach(function () {
		this.view = new PlantListItemView();
	});

	afterEach(function () {
		this.view = null;
	});

	it('has the `Common name` attribute default to an empty string', function () {
		expect(this..get('Common_Name')).to.equal('');
	});