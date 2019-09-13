class Player {
    constructor(name, weights, index) {
        this.name = name;
        this.weights = weights;
        this.runs = 0;
        this.ballsFaced = 0;
        this.index = index;
        this.notOut = true;
    }
}

module.exports = Player;