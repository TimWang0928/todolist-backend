const Todo = require('../models/Todo')

async function getTodoList(req, res) {
    const { _id, userId, taskName, status, deadline, createdAt, updatedAt } = req.query

    const query = {};
    if (_id) query._id = _id;
    if (userId) query.userId = userId;
    if (taskName) query.taskName = taskName;
    if (status) query.status = status;
    if (deadline) query.deadline = deadline;
    if (createdAt) query.createdAt = createdAt;
    if (updatedAt) query.updatedAt = updatedAt;

    try {
        // const todoList = await Todo.find(query)
        const status = await Todo.find(query).populate('status')
        res.status(200).json(
            {
                status: 200,
                data: status
            })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function addTodoList(req, res) {
    const { userId, taskName, status, deadline } = req.body
    try {
        const newTodo = new Todo({
            userId: userId,
            taskName: taskName,
            status: status,
            deadline: deadline,
        })
        await newTodo.save()
        res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ message: 'Server error' });
    }
}

async function updateTodoList(req, res) {
    const { id } = req.params
    const { taskName, status, deadline } = req.body
    try {
        const currentTodo = await Todo.findById(id);

        if (!currentTodo) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const updatedFields = {
            taskName: taskName || currentTodo.taskName,
            status: status || currentTodo.status,
            deadline: deadline || currentTodo.deadline,
        };

        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            updatedFields,
            { new: true }
        );

        res.status(200).json(
            {
                status: 200,
                data: {
                    message: 'Task updated successfully',
                    ...updatedTodo
                }
            });
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ message: 'Server error' });
    }
}

async function deleteTodoById(req, res) {
    const { id } = req.params
    try {
        const todo = await Todo.findByIdAndDelete(id);

        if (!todo) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getTodoList, addTodoList, deleteTodoById, updateTodoList };