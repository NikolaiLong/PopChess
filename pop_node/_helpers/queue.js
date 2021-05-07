const db = require('./database');
const {count} = require("mongodb");
const Queue = db.Queue;
const User = db.User;
const Game = db.Game;

module.exports = {
    enQueue,
    inQueue,
    foundMatch,
};

let queueCount = 0;

const gameStart = [
    -2, -3, -4, -5, -6, -4, -3, -2,
    -1, -1, -1, -1, -1, -1, -1, -1,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 1,
    2, 3, 4, 5, 6, 4, 3, 2
];

async function enQueue(username){
    // validate
    const user = await User.findOne({ username: username });
    if (user === null) {
        throw 'Username "' + username + '" is not valid';
    }
    const found = await Queue.findOne({ userID: user._id });
    if (found !== null) {
        throw 'Username "' + username + '" is already in the queue';
    }
    await User.updateOne({username: username}, {$set: {inQueue: true}});

    // add user to queue
    const inq = new Queue({userID: user._id});
    await inq.save();
    queueCount++;
}

async function inQueue(username){
    if (queueCount < 2) {
        return false;
    }
    const opponents = await Queue.find();
    await foundMatch(opponents[0].userID, opponents[1].userID);
    return true;
}

async function foundMatch(id1, id2) {
    const gameID = Date.now();
    const newGame = new Game({gameID: gameID, board: gameStart});
    await newGame.save();
    await User.updateOne({_id: id1}, {$set:{gameID: gameID, inQueue: false}});
    await User.updateOne({_id: id2}, {$set:{gameID: gameID, inQueue: false}});
    queueCount -= 2;
    const out = await Queue.deleteOne({userID: id1});
    await Queue.deleteOne({userID: id2});
}
