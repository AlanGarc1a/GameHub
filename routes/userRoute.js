const express = require('express');
const router  = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/user');

router.post('/register',  async (req, res) => {
    const { fullname, username, password } = req.body;

    User.findOne({username: username}, async (err, foundUser) => {
        if(err) {
            console.log(err);
        }
        if(foundUser) {
            res.json({ error: `Sorry, that username exists ${username}`});
        } else {
            const salt = await bcrypt.genSalt(saltRounds);
            const hashPassword = await bcrypt.hash(password, salt);

            const user = new User({
                fullname,
                username,
                password: hashPassword
            });

            const newUser = await user.save();
            res.json(newUser);
        }
    });
});

module.exports = router;