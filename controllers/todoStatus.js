const Status = require('../models/TodoStatus')

async function getStatusList(req, res) {
    const { _id, userId, name, color, createdAt, updatedAt } = req.query

    const query = {};
    if (_id) query._id = _id;
    if (userId) query.userId = userId;
    if (name) query.name = name;
    if (color) query.color = color;
    if (createdAt) query.createdAt = createdAt;
    if (updatedAt) query.updatedAt = updatedAt;

    try {
        const statusList = await Status.find(query)
        res.status(200).json(
            {
                status: 200,
                data: statusList
            })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function addStatus(req, res) {
    const { userId, name, color } = req.body
    try {
        const newStatus = new Status({
            userId: userId,
            name: name,
            color: color,
        })
        await newStatus.save()
        res.status(201).json({ message: 'Status added successfully' });
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ message: 'Server error' });
    }
}

async function updateStatus(req, res) {
    const { id } = req.params
    const { name, color } = req.body
    try {
        const currentStatus = await Status.findById(id);

        if (!currentStatus) {
            return res.status(404).json({ message: 'Status not found' });
        }

        const updatedFields = {
            name: name || currentStatus.name, 
            color: color || currentStatus.color, 
        };

        const updatedStatus = await Status.findByIdAndUpdate(
            id,
            updatedFields,
            { new: true }
        );

        res.status(200).json(
            {
                status: 200,
                data: {
                    message: 'Status updated successfully',
                    ...updatedStatus
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

async function deleteStatus(req, res) {
    const { id } = req.params
    try {
        const status = await Status.findByIdAndDelete(id);

        if (!status) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getStatusList, addStatus, updateStatus, deleteStatus };