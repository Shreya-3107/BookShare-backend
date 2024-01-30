const mongoose = require('mongoose');

const BookInfoSchema = new mongoose.Schema({
  createdTime : String,
  title : String,
  author : String,
  review : String,
  rate : String,
  name : String,
  mobile : Number,
  email : String,
  myFile : String,
  isRented : Boolean,
}, {timestamps:true});

const BookInfoModel = mongoose.model('BookInfo', BookInfoSchema);

module.exports = BookInfoModel;

