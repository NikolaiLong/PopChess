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

    // add user to queue
    const inq = new Queue({userID: user._id});
    await inq.save();
    queueCount++;
}

async function inQueue(username){
    if (queueCount === 1) {
        console.log('waiting');
        return false;
    }
    let id1;
    let id2;
    let index = 0;
    const opponents = await Queue.find();
    for (let find in opponents) {
        console.log(find.userID);
        if (index === 0) { id1 = find.userID;}
        if (index === 1) { id2 = find.userID;}
    }
    console.log(id1, id2);
    await foundMatch(id1, id2);
    return true;
    // console.log('searching for match');
    // let user = await User.findOne({ username: username });
    // if (queueCount % 2 === 0) {
    //     setInterval(async function () {
    //         if (user.gameID !== -1) {return}
    //         console.log('waiting');
    //         user = await User.findOne({ username: username });
    //     }, 2000);
    // }
    // let match = false;
    // let found;
    // let seconds = setInterval(async function () {
    //     console.log('start search');
    //     if (match) {clearInterval(seconds)}
    //     const opponents = await Queue.find();
    //     for (let find in opponents) {
    //         console.log('searching');
    //         if (find._id !== undefined && find._id !== user._id){
    //             match = true;
    //             found = find._id;
    //             console.log(find._id);
    //             console.log(user._id);
    //         }
    //     }
    // }, 2000);
    // const gameID = Date.now();
    // const newGame = new Game({gameID: gameID, board: gameStart});
    // await newGame.save();
    // await User.updateOne({username: username}, {gameID: gameID});
    // await User.updateOne({_id: found}, {gameID: gameID});
    // queueCount -= 2;
    // await Queue.deleteOne({userID: user._id});
    // await Queue.deleteOne({userID: found});
}

async function foundMatch(id1, id2) {
    console.log('found match');
    const gameID = Date.now();
    const newGame = new Game({gameID: gameID, board: gameStart});
    await newGame.save();
    await User.updateOne({_id: id1}, {$set:{gameID: gameID}});
    await User.updateOne({_id: id2}, {$set:{gameID: gameID}});
    queueCount -= 2;
    const out = await Queue.deleteOne({userID: id1});
    await Queue.deleteOne({userID: id2});
    console.log(out);
    console.log(typeof id1);
}
