var express = require('express');
var router = express.Router();
// const Todo = require('../models/Todo'); // 引入数据模型

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
