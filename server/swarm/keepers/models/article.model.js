// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Author = require('./author.model');


// create a schema
var articleSchema = new Schema({
  articleId: { type: Number, required: true, unique: true},
  title: String,
  author: String,
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Article = mongoose.model('Article', articleSchema);

// make this available to our users in our Node applications
module.exports = Article;