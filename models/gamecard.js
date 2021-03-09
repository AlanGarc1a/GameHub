const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;

const gameCardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
        trim: true
    }
});

const GameCard = mongoose.model('GameCard', gameCardSchema);

module.exports = GameCard;