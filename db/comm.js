//1.导入数据库封装模块
let mongoose=require('mongoose');

// 2.使用mongoose驱动模块的connect()连接数据库
mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// 监听数据库连接事件
var db = mongoose.connection
db.on('error', function(err) {
  console.log('数据库连接失败')
})
db.once('open', function() {
  console.log('数据库连接成功:http://localhost:9900')
})
