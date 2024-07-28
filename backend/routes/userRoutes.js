const express = require('express');
const { registerUser, authUser, getUserProfile, updateUserProfile, getUsers } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/users',protect, getUsers);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

module.exports = router;
