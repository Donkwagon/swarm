const express = require('express');
var app = express();
const router = express.Router();


const task =          require('./apis/task.api');

router.use('/task', task);

module.exports = router;