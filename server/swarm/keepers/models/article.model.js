
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Author = require('./author.model');

var articleSchema = new Schema({
  articleId: { type: Number, required: true, unique: true},
  title: String,
  author: String,
  created_at: Date,
  updated_at: Date
});

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;