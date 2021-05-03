const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../_models/queue.model');

const schema = new Schema({
        user: { type: User, unique: true},
    }
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Queue', schema);
