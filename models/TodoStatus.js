const mongoose = require('mongoose');

const todoStatusSchema = new mongoose.Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    color:{ type: String, required: true },
},
    {
        timestamps: true, // 启用时间戳
    }
);

const TodoStatus = mongoose.model('TodoStatus', todoStatusSchema);

module.exports = TodoStatus