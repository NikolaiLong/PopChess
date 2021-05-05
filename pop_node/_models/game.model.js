const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
        gameID: {type: Number, unique: true},
        board: [{ type: Number}],
    }
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Game', schema);
