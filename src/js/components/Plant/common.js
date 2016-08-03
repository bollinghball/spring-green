function getMoistureUse (plant) {
    var use = plant.Moisture_Use;
    if (use === 'High') {
        return 18;
    } else if (use === 'Low') {
        return 0.01;
    } else {
        return 0.02;
    }
}

module.exports = {
	getMoistureUse: getMoistureUse
};