const express = require('express');
const router  = express.Router();

let Game = require('../models/gamecard');

//get all games
//endpoint: http://localhost:5000/g/
router.get('/', (req, res) => {
    Game.find()
        .then( games => res.json(games))
        .catch(error => res.status(400).json('Error: ' + error));
});

//endpoint: http://localhost:5000/g/create
//create a game
router.post('/create', (req, res) => {
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

//endpoint: http://localhost:5000/g/:id
//get one game
router.get('/:id', (req, res) => {
    Game.findById(req.params.id)
        .then(game => res.json(game))   
        .catch(error => res.status(400).json('Error: ' + error));
});

//endpoint: http://localhost:5000/g/update/:id
//update one game
router.put('/update/:id', (req, res) => {
    const id = req.params.id;

    Game.findByIdAndUpdate(id, { $set: req.body })
        .then(() => { res.json('Game updated')})
        .catch(error => res.status(400).json('Error: ' + error));
});

//ednpoint: http://localhost:5000/g/delete-game/:id
//delete one game
router.delete('/delete/:id', (req, res) => {
    const id  = req.params.id;

    Game.findByIdAndRemove(id)
        .then( () => { res.json('Game deleted') })
        .catch( error => res.status(400).json('Error: ' + error) );
});

module.exports = router;