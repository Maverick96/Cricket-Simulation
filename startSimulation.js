const Player = require('./player');
const getCurrentStrike = require('./getCurrentStrike');
const getRuns = require('./getRuns');

function startSimulation(wickets, runsRequired, overs, weights, totalWeight, playerNames) {
    const matchCommentary = [];
    let currentStrike = 0, currentPlayers = [];
    let index = 0;
    const playerStats = [];
    // create initial two batsmen
    currentPlayers[index] = new Player(playerNames[index], weights[playerNames[index]], index);
    index++;
    currentPlayers[index] = new Player(playerNames[index], weights[playerNames[index]], index);
    let runs, win = false, randomValue, balls = overs * 6;

    while (wickets && balls) {
        // prints match details before start of the over
        if (balls % 6 === 0) {
            matchCommentary.push(`${overs} over(s) left. ${runsRequired} runs to win`);
            overs--;
        }
        randomValue = Math.random() * totalWeight;
        try {
            runs = getRuns(currentPlayers[currentStrike].weights, randomValue);
        }
        catch (err) {
            console.error(err);
            console.log("Unable to continue match simulation, try again");
            process.exit();
        }
        balls--;
        currentPlayers[currentStrike].ballsFaced += 1;
        // rotate strike for odd runs
        if (runs >= 0) {
            runsRequired -= runs;
            currentPlayers[currentStrike].runs += runs;
            matchCommentary.push(`${currentPlayers[currentStrike].name} scored ${runs} runs(s)`);
        } // if batsmen is out
        else {
            matchCommentary.push(`${currentPlayers[currentStrike].name} got out`);
            wickets--;
            currentPlayers[currentStrike].notOut = false;
            // add player's final stats to be printed in the end
            playerStats[currentPlayers[currentStrike].index] = currentPlayers[currentStrike];
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
        try {
            // who will be facing the next ball
            currentStrike = getCurrentStrike(currentStrike, runs, balls);
        }
        catch (err) {
            console.error(err);
            console.log("Unable to continue match simulation, try again");
            process.exit();
        }

    }

    // add players who are not out to the final stats array
    currentPlayers.map(player => {
        if (player.notOut) {
            playerStats[player.index] = player;
        }
    });

    return {
        win,
        wickets,
        runsRequired,
        balls,
        playerStats,
        matchCommentary
    }

}

module.exports = startSimulation;