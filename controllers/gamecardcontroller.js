const Game = require('../models/gamecard');

module.exports = {
    index: async (req, res) => {
        try {
            let games = await Game.find({});

            if(!games){
                res.status(204).json('No games found');
            }

            res.status(200).json(games);
            
        } catch(error) {
            res.status(400).json(error);
        }
    },
    create: async (req, res) => {
        const { title, date, genre, body, author } = req.body;
        
        try {
            const game = new Game({
                title: title,
                date: date,
                genre: genre,
                summary: body
            });

            game.author = author
        
            let savedGame = await game.save();
        
            if(!savedGame) {
                res.status(400).json('Error creating game');
            }
            res.status(201).json('Game added');
    
        } catch(error) {
            console.log(error);
            res.status(400).json('Error:' + error);
        }
    
    },
    view: async (req, res) => {

        const id = req.params.id;
    
        try {
            let foundGame = await Game.findById(id).populate('author');
    
            if(!foundGame) {
                res.status(204).json('No Game found');
            }
            
            res.status(200).json(foundGame);
    
        } catch(error) {
            res.status(400).json('Error: ' + error);
        }
    },
    update: async (req, res) => {

        const id = req.params.id;
    
        try {
            let updateGame = await Game.findByIdAndUpdate(id, { $set: req.body });
    
            if(!updateGame) {
                res.status(400).json('Failed to update game');
            }
    
            res.status(200).json(updateGame);
    
        } catch(error) {
            res.status(400).json('Error:' + error);
        }
    },
    delete: async (req, res) => {
        const id  = req.params.id;
    
        try {
            let removedGame = await Game.findByIdAndRemove(id);
    
            if(!removedGame) {
                res.status(400).json('Could not delete game');
            }
            res.status(200).json('Game was deleted');
        } catch(error) {
            res.status(400).json('Error:' + error);
        }
    }
}