var express = require('express');
var router = express.Router();
let path = require('path');
let fs = require('fs');
let multiparty=require('multiparty')

//上传图片的接口
router.post('/img', (req, res, next) => {
    //创建一个中间件对象
    var form = new multiparty.Form();

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log('文件上传失败')
        } else {
            var img = files.filedata[0];
            // 从哪里读取文件流
            var read = fs.createReadStream(img.path)
            // 把文件流写入至哪个路径
            var write = fs.createWriteStream(path.join(__dirname, '../public/upload/' + img.originalFilename))
            // 从读取流 流向 写入流
            read.pipe(write)
            write.on('close', function () {
                res.send({ err: 0, msg: '/upload/' + img.originalFilename })
            })
        }
    })
})

module.exports = router;