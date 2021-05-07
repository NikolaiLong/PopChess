const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/database');
const User = db.User;

module.exports = {
    authenticate,
    getByUsername,
    addUser,
}


async function authenticate(username, password) {

    let user = await User.findOne({ username });
    if (user) {
        await User.updateOne({username: username}, {$set:{gameID: -1, inQueue: false}});
        user = await User.findOne({ username });
        console.log(user);
    }
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
    return user;
}

async function getByUsername(username) {
    return User.find({username:username});
}

async function addUser(userParam) {
    await console.log('adding');
    await console.log(userParam.gameID);

    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    else  if (await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }



    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();

}
