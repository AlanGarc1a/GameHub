const express = require('express');
const router  = express.Router();

const gameController = require('../controllers/gamecardcontroller');

//get all games
//endpoint: http://localhost:5000/api/games/
router.get('/', gameController.index);

//endpoint: http://localhost:5000/api/games/create
//create a game
router.post('/create', gameController.create);

//endpoint: http://localhost:5000/api/games/:id
//get one game
router.get('/:id', gameController.view);

//endpoint: http://localhost:5000/api/games/update/:id
//update one game
router.put('/update/:id', gameController.update);

//ednpoint: http://localhost:5000/api/games/delete/:id
//delete one game
router.delete('/delete/:id', gameController.delete);

module.exports = router;