// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
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

// the schema is useless so far
// we need to create a model using it
var Author = mongoose.model('Author', authorSchema);

// make this available to our users in our Node applications
module.exports = Author;