const express = require('express');
var app = express();
const router = express.Router();

const auth =                    require('./authentication/authentication.api');
const database =                require('./database/mongodb.api');
const security =                require('./financial-data/security.api');
const securityMaintenance =     require('./financial-data/security.maintenance.api');
const exchange =                require('./financial-data/exchange.api');
const migrate =                require('./migrate/migrate.api');

router.use('/auth', auth);
router.use('/database', database);
router.use('/financial-data/security', security);
router.use('/financial-data/security-maintenance', securityMaintenance);
router.use('/financial-data/exchange', exchange);
router.use('/migrate', migrate);

module.exports = router;