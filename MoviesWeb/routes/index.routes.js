const express = require('express');
const router = express.Router()
const { apiPromiseHome } = require('../controllers/index.controllers');

router.get('/', apiPromiseHome)

module.exports = router