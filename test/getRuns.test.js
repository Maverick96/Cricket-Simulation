const getRuns = require('../getRuns');
const chai = require('chai');
const sinon_chai = require('sinon-chai');

const config = require('../config');

const players = config.playerNames;
const weight = config.weights[players[0]];
chai.use(sinon_chai);
const expect = chai.expect;
const assert = chai.assert;

describe('check data types of inputs', () => {
    it('weightList should be an array', () => {
        expect(() => {
            getRuns(undefined, 45)
        }).throws('Weightlist is not an array');
    });

    it('random value should be a number', () => {
        expect(() => {
            getRuns(weight, "45")
        }).throws('Random is not a number');
    });
});

describe('test correctness of runs scored', () => {
    it('player scores a six', () => {
        const result = getRuns(weight, 89);
        assert.equal(result, 6, 'Hit 6')
    });

    it('player gets out', () => {
        const result = getRuns(weight, 99);
        assert.equal(result, -1, "Out");
    });
});

