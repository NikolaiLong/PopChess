const db = require('./database');
const {count} = require("mongodb");
const Queue = db.Queue;
const User = db.User;
const Game = db.Game;

module.exports = {
    getBoard,
};

async function getBoard(gameID) {
    const game = Game.findOne({gameID: gameID});
    return game.board;
}
