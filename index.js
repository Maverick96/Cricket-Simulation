const Player = require('./player');
const config = require('./config');
const getCurrentStrike = require('./getCurrentStrike');
const getRuns = require('./getRuns');
const printResult = require('./print');

// setting up env
const weights = config.weights;
const team = config.teamName;
const playerNames = config.playerNames;
const wickets = config.wicketsLeft;
const runsRequired = config.runsRequired;
const oversLeft = config.oversLeft;

const totalWeight = config.totalWeight;

function startSimulation(wickets, runsRequired, overs, weights) {

    let currentStrike = 0, currentPlayers = [];
    let index = 0;
    const allPlayer = [];
    // create initial two batsmen
    currentPlayers[index] = new Player(playerNames[index], weights[playerNames[index]], index);
    index++;
    currentPlayers[index] = new Player(playerNames[index], weights[playerNames[index]], index);
    let runs, win = false, randomValue, balls = oversLeft * 6;

    while (wickets && balls) {
        // prints match details before start of the over
        if (balls % 6 === 0) {
            console.log(`${overs} over(s) left. ${runsRequired} runs to win`)
            overs--;
        }
        randomValue = Math.random() * totalWeight;
        runs = getRuns(currentPlayers[currentStrike].weights, randomValue);
        balls--;
        currentPlayers[currentStrike].ballsFaced += 1;
        // rotate strike for odd runs
        if (runs >= 0) {
            runsRequired -= runs;
            currentPlayers[currentStrike].runs += runs;
            console.log(`${currentPlayers[currentStrike].name} scored ${runs} runs(s)`)
        } // if batsmen is out
        else {
            console.log(`${currentPlayers[currentStrike].name} got out`);
            wickets--;
            currentPlayers[currentStrike].notOut = false;
            // add player's final stats to be printed in the end
            allPlayer[currentPlayers[currentStrike].index] = currentPlayers[currentStrike];
            // create new batsman only if wickets left
            if (wickets) {
                index++;
                currentPlayers[currentStrike] = new Player(playerNames[index], weights[playerNames[index]], index);
            } else {
                break;
            }
        }

        if (runsRequired <= 0) {
            win = true;
            break;
        }
        // who will be facing the next ball
        currentStrike = getCurrentStrike(currentStrike, runs, balls);

    }

    // add players who are not out to the final array
    currentPlayers.map(player => {
        if (player.notOut) {
            allPlayer[player.index] = player;
        }
    });
    // print result and details of each batsman
    printResult(win, wickets, runsRequired, balls, team, allPlayer);

}

startSimulation(wickets, runsRequired, oversLeft, weights);