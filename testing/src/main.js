// Use the expect version of chai assertions - http://chaijs.com/api/bdd
window.expect = chai.expect;

mocha.setup('bdd');

require('./Plant/PlantModel.test');

mocha.run();