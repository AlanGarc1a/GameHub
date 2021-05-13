const express = require('express');
const router = express.Router();

const User = require('../models/user');

//user register endpoint
router.post('/register', async (req, res, next) => {

    try {
        const { username, email, password } = req.body;
        
        const foundUser = await User.findOne({email: email});

        if(foundUser) {
            res.status(404).json({ error: `Email is already in use ${email}`});
        }

        const newUser = new User({
            username,
            email,
            password
        });

        const savedUser = await newUser.save();

        res.status(200).json({success: 'new user register'});

    } catch(error) {
        next(error)
    }
});

//user login endpoint
router.post('/login', (req, res) => {

});

module.exports = router;