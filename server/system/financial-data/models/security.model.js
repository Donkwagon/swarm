
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var securitySchema = new Schema({

  securityName: String,
  symbol: String,
  sector: String,
  industry: String,
  exchange: String,

  created_at: Date,
  updated_at: Date
});


var Security = mongoose.model('Security', securitySchema);

module.exports = Security;