const express = require('express');
const userController = require('../controllers/user');
const verify = require('../middleware/verify');

const router = express.Router();

router.get('/', userController.getUser);
router.get('/:userId', userController.getSpecificUser);

router.post('/signup', userController.createUser);
router.post('/login', userController.login);

router.patch('/:userId', userController.patchUser);

router.delete('/:userId', userController.deleteUser);

router.get('/somewhere/token', verify.verifyToken, (req, res) => {
  res.status(200).json({ message: 'Access Granted' });
});


module.exports = router;
