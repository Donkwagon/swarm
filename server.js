var express =         require("express");
var bodyParser =      require("body-parser");
var mongoose =        require('mongoose');
var http =            require('http');

const { Client } = require('pg');

//////////////////////////////////////////
//Connect to postgresql database
const conString = 'postgres://nvestdb:nvest12345@nvest-staging-33.cpq4uvfyn36t.us-east-1.rds.amazonaws.com:5432/nvestdb?ssl=true';

pgClient = new Client({connectionString: conString});
pgClient.connect();
global.pgClient = pgClient;

//////////////////////////////////////////
//Initialize app and start express server
var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

const server = http.createServer(app);

server.listen(process.env.PORT || 8100, function (err) {
    if (err) {console.log(err);process.exit(1);}
    var port = server.address().port;
    console.log("App now running on port",port);
});

//////////////////////////////////////////
//Connect to mongoose db
const MongoDbConStr = "mongodb://Donkw:Idhap007@ds115532-a0.mlab.com:15532,ds115532-a1.mlab.com:15532/heroku_tln16g2j?replicaSet=rs-ds115532";
global.db = mongoose.createConnection(MongoDbConStr);

//////////////////////////////////////////
//Connect to io
var io = require('socket.io').listen(server.listen(8100));
io.sockets.on('connection',(socket) => {console.log('client connect');});
global.io = io;

//////////////////////////////////////////
//Routing
const queen =         require('./server/swarm/queen');
const system =        require('./server/system/system');
const facility =      require('./server/facility/facility');

app.use('/queen',queen);
app.use('/system',system);
app.use('/facility',facility); // facility is a backend system that support the development logistics

module.exports = app;