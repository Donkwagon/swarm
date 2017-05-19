// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var logSchema = new Schema({

  message: String,
  level: Number,

  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Entrance = mongoose.model('User', logSchema);

// make this available to our users in our Node applications
module.exports = Entrance;