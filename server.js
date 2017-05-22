var express =         require("express");
var bodyParser =      require("body-parser");
var mongoose =        require('mongoose');
var http =            require('http');
var dotenv =          require('dotenv').config();
var admin =           require("firebase-admin");

var chalk =           require('chalk');
 
var serviceAccount =  require("./server/firebase/swarm-2124b-firebase-adminsdk-towvk-3a3e35ee20.json");

var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

const api = require('./server/routes/api');
const queen = require('./server/swarm/queen');

app.use('/api', api);
app.use('/queen',queen);

const server = http.createServer(app);

server.listen(process.env.PORT || 8080, function (err) {
  if (err) {console.log(err);process.exit(1);}
  var port = server.address().port;
  console.log(chalk.cyan("App now running on port", port));
});

//////////////////////////////////////////
//Connect to mongoose db
global.db = (global.db ? global.db : mongoose.createConnection("mongodb://Donkw:Idhap007@ds123351.mlab.com:23351/heroku_30rvwcxc"));
mongoose.connect('mongodb://Donkw:Idhap007@ds123351.mlab.com:23351/heroku_30rvwcxc');

//////////////////////////////////////////
//Connect to Firebase service account
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://swarm-2124b.firebaseio.com"
// });
