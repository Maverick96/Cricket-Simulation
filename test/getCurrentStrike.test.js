const getCurrentStrike = require('../getCurrentStrike');
const chai = require('chai');
const sinon_chai = require('sinon-chai');

chai.use(sinon_chai);
const expect = chai.expect;
const assert = chai.assert;

describe('test type data for getCurrenStrike inputs', () => {

    it('send in incorrect type for currentStrike', () => {
        expect(() => { getCurrentStrike('1', 2, 1) }).to.throws('Type Error');
    });

    it('send in incorrect type for runs', () => {
        expect(() => { getCurrentStrike(1, '6', 1) }).throws('Type Error');
    });

    it('send in incorrect type for balls', () => {
        expect(() => {
            getCurrentStrike(1, 2, '1')
        }).throws('Type Error');
    });

});

describe('test limit of runs that can be scored', () => {
    it('runs more than 6', () => {
        expect(() => getCurrentStrike(1, 10, 1)).throws('Runs more than 6');
    });
});

describe('number of balls to be a postive integer', () => {
    it('sending negative value for number of balls', () => {
        expect(() => getCurrentStrike(1, 4, -1)).throws('Balls cannot be negative');
    });
});

describe('test value range for currentStrike', () => {
    it('send value of currentStrike other than 0 or 1', () => {
        expect(() => getCurrentStrike(3, 3, 2)).throws('There should be only two batsmen at a time');
    })
});

describe('check strike rotation logic', () => {
    it('even number of runs are scored', () => {
        const res = getCurrentStrike(1, 4, 20);
        assert.equal(res, 1, 'strike retained');
    });

    it('odd number of runs are scored', () => {
        const res = getCurrentStrike(1, 3, 5);
        assert.equal(res, 0, 'strike rotated');
    });

    it('even number of runs are scored and over got completed', () => {
        const res = getCurrentStrike(1, 2, 12);
        assert.equal(res, 0, 'strike rotate');
    });

    it('odd number of runs are scored and over got completed', () => {
        const res = getCurrentStrike(1, 3, 6);
        assert.equal(res, 1, 'strike retained');
    });
});