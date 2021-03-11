const express = require('express');
const router  = express.Router();

let Game = require('../models/gamecard');

//get all games
//endpoint: http://localhost:5000/g/
router.route('/').get((req, res) => {
    Game.find()
        .then( games => res.json(games))
        .catch(error => res.status(400).json('Error: ' + error));
});

//endpoint: http://localhost:5000/g/create
//create a game
router.route('/create').post((req, res) => {
    const title = req.body.title;
    const date = req.body.date;
    const image = req.body.image;
    const summary = req.body.body;

    const game = new Game({
        title,
        date,
        image, 
        summary
    });

    game.save()
        .then( () => res.json('Game added'))
        .catch( error => res.status(400).json('Error: ' + error));
});

module.exports = router;