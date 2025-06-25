const express = require('express');
const userController = require('../controllers/UserController');
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/sign-up', userController.createUser)
router.post('/sign-in', userController.loginUser)
router.post('/log-out', userController.logoutUser)
router.put('/update-user/:id',authUserMiddleware, userController.updateUser)
router.delete('/delete-user/:id',authMiddleware, userController.deleteUser)
router.get('/getAll',authMiddleware, userController.getAllUser)
router.get('/get-details/:id',authUserMiddleware, userController.getDetailsUser)
router.post('/refresh-token', userController.refreshToken)
//google
router.post('/google-login', userController.loginWithGoogle)


module.exports = router
