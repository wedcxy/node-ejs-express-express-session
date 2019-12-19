let mongoose = require('mongoose');

//创建一个mongodb对象
let userSchema = mongoose.Schema({
      username: String,
      password: Number,
      // time:Date.now()
  })

// 要想对users集合进行增删改查，mongoose要求必须先创建一个Model模型
// 然后使用这个Model模型提供的api方法，即可实现增删改查的操作
// 第一个参数是集合的名字
var userModel = mongoose.model('users', userSchema)

// 抛出
module.exports = userModel