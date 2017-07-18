const express = require('express');
var app = express();
const router = express.Router();


const auth =          require('./authentication/authentication.api');
const database =      require('./database/mongodb.api');

router.use('/auth', auth);
router.use('/database', database);

module.exports = router;