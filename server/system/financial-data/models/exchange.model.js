
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var exchangeSchema = new Schema({

  exchange: String,
  exchangeName: String,

  numSecurities: Number,

  sectorMappingPercent: Number,   //percent of total securities mapped with sector info
  industryMappingPercent: Number, //percent of total securities mapped with industry info

  created_at: Date,
  updated_at: Date
  
});


var Exchange = mongoose.model('Exchange', exchangeSchema);

module.exports = Exchange;