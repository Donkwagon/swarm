const express = require('express');
var app = express();
const router = express.Router();


const auth =          require('./authentication/authentication.api');
const database =      require('./database/mongodb.api');
const security =      require('./financial-data/security.api');
const exchange =      require('./financial-data/exchange.api');

router.use('/auth', auth);
router.use('/database', database);
router.use('/financial-data/security', security);
router.use('/financial-data/exchange', exchange);

module.exports = router;