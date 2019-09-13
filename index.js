const Player = require('./player');
const config = require('./config');
const getCurrentStrike = require('./getCurrentStrike');

// setting up env
const weights = config.weights;
const team = config.teamName;
const playerNames = config.playerNames;
const wickets = config.wicketsLeft;
const runsRequired = config.runsRequired;
const oversLeft = config.oversLeft;

const total = 100;

function printResult(win, wickets, runs, balls, team, playerStats) {
    if (win) {
        console.log(`${team} won by ${wickets} wickets with ${balls} balls remaining`)
    } else {
        console.log(`${team} lost by ${runs} runs`);
    }

    // print player stats
    playerStats.map(player => {
        console.log(`${player.name} - ${player.runs}${player.notOut ? '* ' : ' '} (${player.ballsFaced} balls)`);
    });
}

function startSimulation(wickets, runsRequired, overs, weights) {

    let currentStrike = 0, currentPlayers = [];
    let index = 0;
    const allPlayer = [];
    currentPlayers[index] = new Player(playerNames[index], weights[playerNames[index]], index);
    index++;
    currentPlayers[index] = new Player(playerNames[index], weights[playerNames[index]], index);
    // console.log(currentPlayers[index]);
    let runs, win = false, randomValue, balls = oversLeft * 6;

    while (wickets && balls) {

        if (balls % 6 === 0) {
            console.log(`${overs} over(s) left. ${runsRequired} runs to win`)
            overs--;
        }

        randomValue = Math.random() * total;
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
            allPlayer[currentPlayers[currentStrike].index] = currentPlayers[currentStrike];
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

        currentStrike = getCurrentStrike(currentStrike, runs, balls);

    }

    currentPlayers.map(player => {
        allPlayer[player.index] = player;
    });

    printResult(win, wickets, runsRequired, balls, team, allPlayer);

}

startSimulation(wickets, runsRequired, oversLeft, weights);