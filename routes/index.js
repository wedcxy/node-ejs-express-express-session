var express = require('express');
var router = express.Router();
var textModel = require('../db/textmodle');

/* 首页页面路由 */
router.get('/', function (req, res, next) {
  // 获取前端传递过来的页码
  let {
    page
  } = req.query
  // 如果用户没有传递页码，默认显示第一页
  page = page ? page : 1

  //1.查询文章的总体数量,用于分页
  textModel.find().count().then(doc => {
    let textls = Math.ceil(doc / 4);


    textModel.find().skip((page - 1) * 4).limit(4).then(arr => {
      res.render('index', {
        list: arr,
        textls: textls,
        name:req.session.username
      })
    }).catch(err => {
      res.json('')
    })
  })

});

//登录页面路由
router.get('/login', function (req, res, next) {
  res.render('login', {});
});


//注册页面路由
router.get('/register', function (req, res, next) {
  res.render('register', {});
});

//发表文章的路由
router.get('/text', function (req, res, next) {
  let {id}=req.query;
  
  //判断点击进来是发表，还是修改文章
  if(id)
  {
    textModel.find({_id:id}).then(doc=>{
      console.log(doc)
      res.render('text', {arr:doc[0],name:req.session.username});
    })
  }else
  {
    res.render('text', {arr:'',name:req.session.username});
  }
});

//文章详情页面路由，接口
router.get('/particulars',(req,res,next)=>{
  let {id}=req.query
  //根据点击传递进来的文章id查询具体文章
  textModel.find({_id:id}).then(doc=>{
    let list=doc;
    res.render('particulars',{list:list[0],name:req.session.username})
  })
})

//删除文章的接口
router.get('/delete',(req,res,next)=>{
  let {id}=req.query;

  textModel.deleteOne({_id:id}).then(()=>{
    console.log('删除成功')
    res.redirect('/')
  }).catch(err=>{
    console.log('删除失败')
  })
})
module.exports = router;