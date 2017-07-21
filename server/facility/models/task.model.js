
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({

  name: String,
  description: String,

  createt_by: String,
  
  created_at: Date,
  updated_at: Date

});


var Task = mongoose.model('Task', taskSchema);

module.exports = Task;