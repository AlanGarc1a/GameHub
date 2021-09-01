const User = require('../models/user');

module.exports = {
    register: async (req, res, next) => {
        try {
            const { username, email, password } = req.body;

            const foundUser = User.findOne({ username });

            if(foundUser) {
                res.status(400).json({message: "A user with that username already exists "});
            }
    
            const user = new User( { username, email } );

            const registerUser = await User.register(user, password);
    
            req.login(registerUser, err => {
                if(err) return next(err);
                res.json(registerUser);
            });
    
        } catch(error) {
            next(error)
        }
    },
    login: async (req, res) => {
        res.status(200).json(req.user);
    },
    logout: (req, res) => {
        req.logout();
        res.status(200).json('logout successfull');
    }
}