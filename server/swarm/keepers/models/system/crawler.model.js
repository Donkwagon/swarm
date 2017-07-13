// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Site = require('./site.model');


var crawlerSchema = new Schema({

  name: String,
  type: String,
  url: String,
  site: Site,
  siteId: String,
  code: String,
  doc: String,
  description: String,
  
  inputDataType: String,
  outputDataType: String,
  
  editHistory: Schema.Types.Mixed,

  urlStrategy: Schema.Types.Mixed,
  crawlingStrategy: Schema.Types.Mixed,
  testingStrategy: Schema.Types.Mixed,

  validation: Boolean,
  
  created_by: String,

  created_at: Date,
  updated_at: Date

});

var SitCrawlere = mongoose.model('Crawler', sitecrawlerSchemaSchema);

module.exports = Crawler;