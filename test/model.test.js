const GameCard = require('../models/gamecard');
const mongoose = require('mongoose');
const { assert } = require('chai');

describe('GameCard', () => {

    beforeEach(() => {
        mongoose.connect('mongodb://localhost:27017/gamehub')
                .then(() => { console.log('Database connected') } )
                .catch((error) => { console.log('Error in connecting to database', error) })
    });

    afterEach(() => {
        GameCard.collection.drop();
    });

    it('should create a gamecard and save to the database', async () => {
        const gamecard = new GameCard({
            title: 'Resident Evil 1',
            date: 2001,
            genre: 'Horror',
            summary: 'Second game in the resident evil franchise',
            author: "61535b22ec6f8f0dc911370d"
        });

        await gamecard.save();
    });

    it('should fail to create gamecard if at least one path is missing', () => {
        const gamecard = new GameCard({
            date: 2001,
            genre: 'Horror',
            summary: 'Second game in the resident evil franchise',
            author: "61535b22ec6f8f0dc911370d"
        });
    });

    it('creates a gamecard with the title', () => {
        const gamecard = new GameCard({
            title: 'Resident Evil 1',
        });

        assert.strictEqual(gamecard.title, 'Resident Evil 1');
    });

    it('should update the gamecard path with the new path', () => {
        const gamecard = new GameCard({
            title: 'Resident Evil 1',
            date: 2001,
            genre: 'Horror',
            summary: 'Second game in the resident evil franchise',
            author: "61535b22ec6f8f0dc911370d"
        });

        gamecard.date = 2000

        assert.strictEqual(gamecard.date, 2000);
    });
});