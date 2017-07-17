var express =         require("express");
var bodyParser =      require("body-parser");
var mongoose =        require('mongoose');
var http =            require('http');
var dotenv =          require('dotenv').config();

var chalk =           require('chalk');

var admin =           require("firebase-admin");
var serviceAccount =  require("./server/firebase/swarm-c0b98-firebase-adminsdk-q66u1-685dfe1150");

// adapter: postgresql
// database: nvestdb
// username: nvestdb
// password: nvest12345
// host: nvest-staging-33.cpq4uvfyn36t.us-east-1.rds.amazonaws.com
// var pgp = require('pg-promise')();
// const conString = 'postgres://nvestdb:nvest12345@nvest-staging-33.cpq4uvfyn36t.us-east-1.rds.amazonaws.com:5432/nvestdb?ssl=true';

var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

const server = http.createServer(app);

server.listen(process.env.PORT || 8100, function (err) {
    if (err) {console.log(err);process.exit(1);}
    var port = server.address().port;
    console.log(chalk.cyan("App now running on port", port));
});

//////////////////////////////////////////
//Connect to mongoose db
var MongoDbConStr = "mongodb://Donkw:Idhap007@ds115532-a0.mlab.com:15532,ds115532-a1.mlab.com:15532/heroku_tln16g2j?replicaSet=rs-ds115532";
global.db = (global.db ? global.db : mongoose.createConnection(MongoDbConStr));
mongoose.connect(MongoDbConStr);

//////////////////////////////////////////
//Connect to io
var io = require('socket.io').listen(server.listen(8100));

io.sockets.on('connection', function (socket) {
    console.log('client connect');
    socket.on('echo', function (data) {
        io.sockets.emit('message', data);
    });
});

global.io = io;

//////////////////////////////////////////
//Routing
const api = require('./server/routes/api');
const queen = require('./server/swarm/queen');
const system = require('./server/system/system');

app.use('/api', api);
app.use('/queen',queen);
app.use('/system',system);

module.exports = app;