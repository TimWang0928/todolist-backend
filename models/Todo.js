const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    taskName: { type: String, required: true },
    // completed: { type: Boolean, default: false },
    status:{ type: mongoose.Schema.Types.ObjectId, ref: 'TodoStatus', required: false },
    deadline: { type: Date },
},
    {
        timestamps: true, // 启用时间戳
    }
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo