function getCurrentStrike(currentStrike, runs, balls) {
    if (typeof currentStrike === 'number' && typeof runs === 'number' && typeof balls === 'number') {

        if (runs > 6) {
            throw new Error('Runs more than 6');
        }

        if (balls < 0) {
            throw new Error('Balls cannot be negative');
        }

        if (currentStrike !== 0 && currentStrike !== 1) {
            throw new Error('There should be only two batsmen at a time')
        }


        // rotate strike if runs are odd
        if (runs % 2 === 1) {
            currentStrike = currentStrike % 2 === 0 ? 1 : 0;
        }

        // rotate strike if over is completed
        if (balls % 6 === 0) {
            currentStrike = currentStrike % 2 === 0 ? 1 : 0;
        }
        return currentStrike;
    } else {
        throw new Error('Type Error');
    }

}

module.exports = getCurrentStrike;