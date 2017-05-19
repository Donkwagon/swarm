// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var entranceSchema = new Schema({

  name: String,
  username: { type: String, required: true, unique: true },
  url: String,
  siteName: String,
  siteUrl: String,
  strategy: Any,
  status: String,

  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Entrance = mongoose.model('Entrance', entranceSchema);

// make this available to our users in our Node applications
module.exports = Entrance;