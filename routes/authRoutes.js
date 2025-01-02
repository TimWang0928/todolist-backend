const express = require('express');
const { login, register } = require('../controllers/authController');

const router = express.Router();
// router.use(authenticateToken)
// 登录路由
router.post('/login', login);
router.post('/register', register);

module.exports = router;