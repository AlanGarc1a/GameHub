const express = require('express');
const router = express.Router();

const { auth } = require('../helpers/helpers')

const userController = require('../controllers/usercontroller');

//find the user
router.get('/', auth, userController.index);

//user register endpoint
router.post('/register', userController.register);

//user login endpoint
router.post('/login', userController.login);

//valid token route
router.post('/tokenIsValid', userController.tokenIsValid);

module.exports = router;