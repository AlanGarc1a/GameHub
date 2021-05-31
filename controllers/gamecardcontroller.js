const Game = require('../models/gamecard');

module.exports = {
    index: async (req, res) => {
        try {
            let games = await Game.find({});
    
            if(!games) {
                res.json({ msg: 'No games found' });
            }
    
            res.json(games);
    
        } catch(error) {
            res.json({ error:  error });
        }
    },
    create: async (req, res) => {
        const { title, date, image, body } = req.body;
    
        try {
            const game = new Game({
                title: title,
                date: date,
                image: image,
                summary: body
            });
        
            let savedGame = await game.save();
        
            if(!savedGame) {
                res.status(400).json('Error:' + error);
            }
            res.json('Game added');
    
        } catch(error) {
            res.status(400).json('Error:' + error);
        }
    
    },
    view: async (req, res) => {

        const id = req.params.id;
    
        try {
            let foundGame = await Game.findById(id);
    
            if(!foundGame) {
                res.json('No Game exists');
            }
            
            res.json(foundGame);
    
        } catch(error) {
            res.status(400).json('Error: ' + error);
        }
    },
    update: async (req, res) => {

        const id = req.params.id;
    
        try {
            let updateGame = await Game.findByIdAndUpdate(id, { $set: req.body });
    
            if(!updateGame) {
                res.json({ msg: 'Could not update Game'})
            }
    
            res.json(updateGame);
    
        } catch(error) {
            res.status(400).json('Error:' + error);
        }
    },
    delete: async (req, res) => {
        const id  = req.params.id;
    
        try {
            let removedGame = await Game.findByIdAndRemove(id);
    
            if(!removedGame) {
                res.json({ msg: 'Could not delete Game'})
            }
            res.json({msg: 'Game deleted'})
        } catch(error) {
            res.status(400).json('Error:' + error);
        }
    }
}