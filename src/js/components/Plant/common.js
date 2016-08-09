function getMoistureUse (indicator) {
	var result;

    if (indicator === 'High') {
        result = 0.04;
    } else if (indicator === 'Low') {
        result = 0.01;
    } else {
        result = 0.02;
    }

}

module.exports = {
	getMoistureUse: getMoistureUse
};