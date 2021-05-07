const db = require('./database');
const {count} = require("mongodb");
const Queue = db.Queue;
const User = db.User;
const Game = db.Game;
const pyShell = require('python-shell');

module.exports = {
    getBoard,
    move,
};

async function getBoard(id) {
    console.log(id);
    const games = await Game.find();
    for (let game in games) {
        // console.log(games[game].gameID);
        if (games[game].gameID === id) {
            console.log(games[game].board)
            return games[game].board;
        }
    }
    return null;

}

async function move(id, pieces) {
    let board = await this.getBoard(id);
    const tempVal = board[pieces[0]];
    board[pieces[0]] = board[pieces[1]];
    board[pieces[1]] = tempVal;
    await Game.updateOne({gameID: id}, {$set: {board: board}});
    return;
    // let options = {
    //     mode: 'text',
    //     pythonOptions: ['-u'], // get print results in real-time
    //     scriptPath: '../chess_python/Chess/Controls', //If you are having python_test.py script in same folder, then it's optional.
    //     // args: [''] //An argument which can be accessed in the script using sys.argv[1]
    // };
    //
    //
    // pyShell.run('play.py', options, function (err, result){
    //     if (err) throw err;
    //     // result is an array consisting of messages collected
    //     //during execution of script.
    //     console.log('result: ', result.toString());
    //     res.send(result.toString())
    // });
    // return null;
}
