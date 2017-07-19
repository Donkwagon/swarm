
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var crawlerBacklogSchema = new Schema({

  site: String,
  crawlerName: String,

  batchId: Number,
  batch: Schema.Types.Mixed,//array of backlog param arrays

  totalNum: Number,
  completedNum: Number,
  completed: Boolean,
  response: Schema.Types.Mixed,//array of responses

  created_at: Date,
  updated_at: Date

});


var CrawlerBacklog = mongoose.model('Crawlerbacklog', crawlerBacklogSchema);

module.exports = CrawlerBacklog;