const User = require('../models/user');

module.exports = {
    register: async (req, res, next) => {
        try {
            const { username, email, password } = req.body;
            
            const foundUser = await User.findOne({ username });
            const foundEmail = await User.findOne({ email });
            
            if(foundUser) {
                return res.status(401).json('username is already taken');
            }
            if(foundEmail) {
                return res.status(401).json('An account exists with that email');
            }
          
            const user = new User( { username, email } );
        
            const registerUser = await User.register(user, password);
            
            req.login(registerUser, err => {
                if(err) return next(err);
                res.status(200).json(registerUser);
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
        res.status(200).send('logout successfull');
    }
}