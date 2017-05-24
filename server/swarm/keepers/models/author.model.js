
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authorSchema = new Schema({

  displayName: String,
  username: { type: String, required: true, unique: true },
  displayImage: String,
  
  numArticles: Number,
  numPremiumArticles: Number,
  numBlogPosts: Number,
  numComments: Number,
  numStockTalks: Number,
  numFollowers: Number,
  NumFollowings: Number,

  bio: String,
  bioTags: String,
  RSSFeedUrl: String,
  contributorSince: Number,

  links: Schema.Types.Mixed,

  created_at: Date,
  updated_at: Date
});


var Author = mongoose.model('Author', authorSchema);

module.exports = Author;