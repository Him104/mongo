const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController.js');


router.post('/register', registerController.createUser);
router.get('/userDetails/:userId',registerController.getUser);

module.exports = router;