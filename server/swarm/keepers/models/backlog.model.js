// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var backlogSchema = new Schema({

  backlogID: { type: String, required: true, unique: false },
  type: String,
  url: String,
  content: Schema.Types.Mixed,
  siteUrl: String,
  strategy: Schema.Types.Mixed,
  status: String,

  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Backlog = mongoose.model('Backlog', backlogSchema);

// make this available to our users in our Node applications
module.exports = Backlog;