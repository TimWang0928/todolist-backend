const User = require('../models/User');
const jwt = require('jsonwebtoken');

// 登录控制器
async function login(req, res) {
    const { username, password } = req.body;

    try {
        // 查找用户
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // 验证密码
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // 创建 JWT
        const token = jwt.sign(
            { id: user._id, username: user.username },
            'wyx',
            { expiresIn: '1h' }
        );

        res.json(
            {
                status: 200,
                data: {
                    message: 'Login successful',
                    token: token,
                    userId: user._id,
                    userName:user.username,
                }
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

async function register(req, res) {
    const { username, password } = req.body;

    try {
        // 检查用户名是否已存在
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // 创建新用户
        const newUser = new User({ username, password });
        await newUser.save();

        res.status(201).json(
            {
                status: 201,
                data: {
                    message: 'User registered successfully',
                }
            });
    } catch (error) {
        console.error('Registration error:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1]; // 'Bearer <token>'
    jwt.verify(token, 'wyx', (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

module.exports = { login, register, authenticateToken };