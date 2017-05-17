const express = require('express');
var app = express();
const queen = express.Router();

const SA = require('./workers/seeking-alpha.crawler');
queen.use('/SA', SA);

module.exports = queen;