// models/book.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
  name: String,
});

module.exports = mongoose.model("book", bookSchema);
