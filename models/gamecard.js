const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const GameCardSchema = new Schema({
    title: { 
        type: String, 
        required: true
    },
    date: { 
        type: Number, 
        required: true
    },
    genre: {
        type: String,
        enum: ['Adventure', 'Arcade', 'Fighting', 'Horror', 'Strategy', 'Shooter', 'Platformer', 'Other'],
        required: true
    },
    summary: { 
        type: String, 
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Game = mongoose.model('GameCard', GameCardSchema);

module.exports = Game;