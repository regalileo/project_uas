const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const authenticateJWT = require('../middlewares/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', authenticateJWT, userController.getAllUsers);
router.get('/:id', authenticateJWT, userController.getUserById);
router.put('/:id', authenticateJWT, userController.updateUser );
router.delete('/:id', authenticateJWT, userController.deleteUser );

module.exports = router;