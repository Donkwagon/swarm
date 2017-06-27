// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Site = require('./site.model');


var crawlerSchema = new Schema({

  name: String,
  url: String,
  site: Site,
  siteId: String,
  code: String,
  doc: String,
  editHistor: Schema.Types.Mixed,

  created_at: Date,
  updated_at: Date

});

var SitCrawlere = mongoose.model('Crawler', sitecrawlerSchemaSchema);

module.exports = Crawler;