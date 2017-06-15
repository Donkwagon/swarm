var express =         require("express");
var bodyParser =      require("body-parser");
var mongoose =        require('mongoose');
var http =            require('http');
var url =             require('url');
var dotenv =          require('dotenv').config();
var admin =           require("firebase-admin");

var chalk =           require('chalk');
 
var serviceAccount =  require("./server/firebase/swarm-f92be-firebase-adminsdk-2xqe2-88b9c9c713");

  // adapter: postgresql
  // database: nvestdb
  // username: nvestdb
  // password: nvest12345
  // host: nvest-staging-33.cpq4uvfyn36t.us-east-1.rds.amazonaws.com

// var pgp = require('pg-promise')();
// const conString = 'postgres://nvestdb:nvest12345@nvest-staging-33.cpq4uvfyn36t.us-east-1.rds.amazonaws.com:5432/nvestdb?ssl=true';
// var pgDb = pgp(conString);
// console.log(pgDb);
// pgDb.none('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)')
//     .then(() => {
//         console.log("inserted???");
//     })
//     .catch(error => {
//         console.log(error);
//     });
    
// pgDb.none('INSERT INTO items(text, complete) VALUES($1, $2)', ['John', true])
//     .then(() => {
//         console.log("inserted???");
//     })
//     .catch(error => {
//         console.log(error);
//     });
var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

const server = http.createServer(app);

server.listen(8100, function (err) {
  if (err) {console.log(err);process.exit(1);}
  var port = server.address().port;
  console.log(chalk.cyan("App now running on port", port));
});

//////////////////////////////////////////
//Connect to mongoose db
global.db = (global.db ? global.db : mongoose.createConnection("mongodb://Donkw:Idhap007@ds115532-a0.mlab.com:15532,ds115532-a1.mlab.com:15532/heroku_tln16g2j?replicaSet=rs-ds115532"));
mongoose.connect('mongodb://Donkw:Idhap007@ds115532-a0.mlab.com:15532,ds115532-a1.mlab.com:15532/heroku_tln16g2j?replicaSet=rs-ds115532');


//Start socket.io server 
var io = require("./server/socket.server").listen(server);

const api = require('./server/routes/api');
const queen = require('./server/swarm/queen');

app.use('/api', api);
app.use('/queen',queen);



