// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

///////////////////////////////////////////////////////
var serviceAccount =  require("../../../../firebase/swarm-2124b-firebase-adminsdk-towvk-3a3e35ee20.json");
var admin = require("firebase-admin");
admin.initializeApp({credential: admin.credential.cert(serviceAccount),databaseURL: "https://swarm-2124b.firebaseio.com"});
var firebaseDb = admin.database();
var ref = firebaseDb.ref("swarm/logs");

var logSchema = new Schema({

  message: String,
  level: String,
  status: Number,
  subject: String,
  action: String,

  created_at: Date,
  updated_at: Date

});


logSchema.methods.pushToFirebaseDb = (log) => {
  log = JSON.parse(JSON.stringify(log));
  ref.push().set({log});
};

var Log = mongoose.model('Log', logSchema);

module.exports = Log;