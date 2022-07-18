const express = require('express');
const PagesController = require('../Controller/PagesController');
const router = express.Router();

router.get('/', PagesController.home);
router.get('/login', PagesController.login);
router.get('/registro', PagesController.registro);

module.exports = router;