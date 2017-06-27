// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var siteSchema = new Schema({

  name: String,
  type: String, //id based, periodically updated
  numStep: Number,
  url: String,
  imgUrl: String,
  description: String,
  crawlers: Schema.Types.Mixed,

  created_at: Date,
  updated_at: Date

});

var Site = mongoose.model('Site', siteSchema);

module.exports = Site;