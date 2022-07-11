const express = require('express');
const PagesController = require('../Controller/PagesController');
const router = express.Router();

router.get('/', PagesController.home);

module.exports = router;