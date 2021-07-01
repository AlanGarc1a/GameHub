const express = require('express');
const router = express.Router();

const passport = require('passport');

const userController = require('../controllers/usercontroller');

//user register endpoint
router.post('/register', userController.register);

//user login endpoint
router.post('/login', passport.authenticate('local'), userController.login);

//user logout
router.get('/logout', userController.logout);

module.exports = router;