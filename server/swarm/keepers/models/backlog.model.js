
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

var Backlog = mongoose.model('Backlog', backlogSchema);

module.exports = Backlog;