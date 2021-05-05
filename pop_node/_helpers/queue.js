const db = require('./database');
const Queue = db.Queue;
const User = db.User;
const Game = db.Game;

module.exports = {
    enQueue,
    inQueue,
};

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

    // add user to queue
    const inq = new Queue({userID: user._id});
    await inq.save();
}

async function inQueue(username){
    console.log('searching for match');
    const user = await User.findOne({ username: username });
    if (Queue.count() % 2 === 1) {
        while (user.gameID === -1) {}
        return;
    }
    var match = false;
    var found;
    while (!match) {
        const opponents = await Queue.find();
        console.log(Queue.count());
        for (var find in opponents) {
            if (find._id !== undefined && find._id !== user._id){
                match = true;
                found = find._id;
                console.log(find._id);
                console.log(user._id);
            }
        }
    }
    const gameID = Date.now();
    const newGame = new Game({gameID: gameID, board: gameStart});
    await newGame.save();
    await User.updateOne({username: username}, {gameID: gameID});
    await User.updateOne({_id: found}, {gameID: gameID});
}
