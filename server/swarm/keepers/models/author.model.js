
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authorSchema = new Schema({

  displayName: String,
  username: { type: String, required: true, unique: true },
  displayImage: String,
  
  numArticles: Number,
  numBlogPosts: Number,
  numComments: Number,
  numStockTalks: Number,
  numFollowers: Number,
  NumFollowings: Number,

  bio: String,
  RSSFeedUrl: String,
  contributorSince: Number,

  created_at: Date,
  updated_at: Date
});

var Author = mongoose.model('Author', authorSchema);

module.exports = Author;