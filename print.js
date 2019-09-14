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

module.exports = printResult;