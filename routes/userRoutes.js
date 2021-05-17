const express = require('express');
const router = express.Router();

const { signInAccessToken, verifyAccessToken, auth } = require('../helpers/helpers')

const User = require('../models/user');

//find the user
router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user);

    res.json({
        userName: user.username,
        id: user._id,
    });
});

//user register endpoint
router.post('/register', async (req, res, next) => {

    try {
        const { username, email, password } = req.body;

        if(!username || !email || !password) {
            return res.status(400).json({msg: 'All fields need to be met'});
        }
        
        const foundUser = await User.findOne({email: email});

        if(foundUser) {
            res.status(400).json({ 
                msg: "An account already exists with that email"
            });
        }

        const newUser = new User({
            username,
            email,
            password
        });

        const savedUser = await newUser.save();

        res.json(savedUser);

    } catch(error) {
        next(error)
    }
});

//user login endpoint
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const foundUser = await User.findOne({ email });

        if(!foundUser) {
            res.status(400).json({msg: `No user exist with that email: ${email}`});
        }

        const isMatch = await foundUser.isValidPassword(password);

        if(!isMatch){
            res.status(400).json({error: `Incorrect password/username`});
        }

        const token = signInAccessToken(foundUser._id);

        res.status(200).json({
            token,
            user: {
                id: foundUser._id,
                userName: foundUser.username
            }
         });

    } catch(err) {
        res.status(500).json({ error: err.message});
    }
});

//valid token route
router.post('/tokenIsValid', async (req, res) => {
    try {
        const token = req.header('x-auth-token');

        if(!token) return res.json(false);

        const verified = verifyAccessToken(token);

        if(!verified) return res.json(false);

        const foundUser = await User.findById(verified.id);

        if(!foundUser) return res.json(false);

        return res.json(true);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;