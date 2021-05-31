const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const gameCardSchema = new Schema({
    title: { 
        type: String, 
        required: true
    },
    date: { 
        type: String, 
        required: true
    },
    image: { 
        type: String,
        required: true
    },
    summary: { 
        type: String, 
        required: true
    },
});

const Game = mongoose.model('GameCard', gameCardSchema);

module.exports = Game;