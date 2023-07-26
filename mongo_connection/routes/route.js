const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController.js');
// const getUser = require('../controllers/getUserController.js');

router.post('/register', registerController.createUser);
// router.get("/users/:userId", getUser.getuserById);
module.exports = router;