var express = require("express");
var bodyParser = require("body-parser");
const http = require('http');
var app = express();
var mongoose = require('mongoose');
const dotenv = require('dotenv').config();

app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

const api = require('./server/routes/api');
app.use('/api', api);

const queen = require('./server/swarm/queen');
app.use('/queen',queen);

const server = http.createServer(app);
server.listen(process.env.PORT || 8080, function (err) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  var port = server.address().port;
  console.log(process.env.S3_BUCKET);
  console.log("App now running on port", port);
});

global.db = (global.db ? global.db : mongoose.createConnection("mongodb://Donkw:Idhap007@ds123351.mlab.com:23351/heroku_30rvwcxc"));
mongoose.connect('mongodb://Donkw:Idhap007@ds123351.mlab.com:23351/heroku_30rvwcxc');

