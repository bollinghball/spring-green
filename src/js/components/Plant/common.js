function getMoistureUse (indicator) {
    if (indicator === 'High') {
        return 0.04;
    } else if (indicator === 'Low') {
        return 0.01;
    } else {
        return 0.02;
    }
}

module.exports = {
	getMoistureUse: getMoistureUse
};