function getRuns(weightList, randomValue) {

    if (!Array.isArray(weightList)) {
        throw new Error('Weightlist is not an array');
    } else if (typeof randomValue !== 'number') {
        throw new Error('Random is not a number');
    } else {
        for (let i = 0; i < weightList.length; i++) {
            if (randomValue < weightList[i].weight) {
                return weightList[i].value;
            }
            randomValue -= weightList[i].weight;
        }
    }
}

module.exports = getRuns;