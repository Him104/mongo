const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController.js');
const middlewares = require('../middleware/auth.js');

router.post('/register', registerController.createUser);
router.post('/userLogin',registerController.login)
router.get('/userDetails/:userId', middlewares.authentication, registerController.getUser);
router.put('/updateUser/:userId', middlewares.authentication,registerController.updateUser)
router.delete('/deleteUser/:userId', middlewares.authentication,registerController.deleteUser);

module.exports = router;