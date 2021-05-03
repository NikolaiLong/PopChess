module.exports = enQueue();
module.exports = inQueue();
const db = require('./database');
const Queue = db.Queue;
const User = db.User;

async function enQueue(username){
    // validate
    const user = await User.findOne({ username: username });
    if (user) {
        throw 'Username "' + username + '" is not valid';
    }
    const found = await Queue.findOne({ user: user });
    if (found) {
        throw 'Username "' + username + '" is already in the queue';
    }

    // add user to queue
    const inq = new Queue(found);
    await inq.save();
}

function inQueue(){

}
