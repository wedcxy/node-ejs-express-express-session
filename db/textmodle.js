let mongoose = require('mongoose');

//创建一个mongodb对象
let textSchema = mongoose.Schema({
      title: String,
      content: String,
      time:Number,
      author:String
  })


var textModel = mongoose.model('texts', textSchema)

// 抛出
module.exports = textModel