const config = require('./config');
const startSimulation = require('./startSimulation');
const printResult = require('./print');

// setting up env
const weights = config.weights;
const team = config.teamName;
const playerNames = config.playerNames;
const wickets = config.wicketsLeft;
const runsRequired = config.runsRequired;
const oversLeft = config.oversLeft;

const totalWeight = config.totalWeight;



const result = startSimulation(wickets, runsRequired, oversLeft, weights, totalWeight, playerNames);
printResult({ ...result, team });