function printResult(result) {
    if (result.win) {
        console.log(`${result.team} won by ${result.wickets} wickets with ${result.balls} balls remaining`)
    } else {
        console.log(`${result.team} lost by ${result.runs} runs`);
    }

    // print player stats
    result.playerStats.map(player => {
        console.log(`${player.name} - ${player.runs}${player.notOut ? '* ' : ' '} (${player.ballsFaced} balls)`);
    });

    // print commentary
    result.matchCommentary.map(commentary => {
        console.log(commentary);
    })
}

module.exports = printResult;