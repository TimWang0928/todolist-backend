const express = require('express');
const { getTodoList, addTodoList, deleteTodoById, updateTodoList } = require('../controllers/todoList');
const { authenticateToken } = require('../controllers/authController');
const {getStatusList, addStatus, updateStatus, deleteStatus} = require('../controllers/todoStatus')

const router = express.Router();
router.use(authenticateToken)

// 登录路由
router.get('/get', getTodoList);
router.post('/add', addTodoList);
router.put('/update/:id', updateTodoList);
router.delete('/delete/:id', deleteTodoById);

router.get('/status/get', getStatusList);
router.post('/status/add', addStatus);
router.put('/status/update/:id', updateStatus);
router.delete('/status/delete/:id', deleteStatus);


module.exports = router;