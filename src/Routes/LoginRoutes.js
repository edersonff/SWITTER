const express = require('express');
const LoginController = require('../Controller/LoginController');
const router = express.Router();

router.get('/login', LoginController.login);
router.get('/register', LoginController.register);
router.post('/login', LoginController.loginPost);
router.post('/register', LoginController.registerPost);

module.exports = router;