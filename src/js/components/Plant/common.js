function getMoistureUse (indicator) {
    if (indicator === 'High') {
        return 18;
    } else if (indicator === 'Low') {
        return 0.01;
    } else {
        return 18;
    }
}

module.exports = {
	getMoistureUse: getMoistureUse
};