const express = require('express');
var app = express();
const router = express.Router();


const auth =       require('./authentication/authentication.api');
router.use('/auth', auth);

module.exports = router;