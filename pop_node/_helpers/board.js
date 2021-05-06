const db = require('./database');
const {count} = require("mongodb");
const Queue = db.Queue;
const User = db.User;
const Game = db.Game;

module.exports = {
    getBoard,
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
