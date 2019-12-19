var express = require('express');
var router = express.Router();
var userModel=require('../db/model');
var textModel=require('../db/textmodle');

// 登录接口
router.post('/login', (req, res, next) =>{
  //es6结构赋值
  let {username,password}=req.body;

  //数据库查询账号，密码
  userModel.find({username,password}).then(doc=>{

    //判断结构用户存在就返回大于1
      if(doc.length>0)
      {
        req.session.liLogin=true
        req.session.username=username
        res.redirect('/')
      }else
      {
        res.redirect('/login')
      }
  })
})

// 注册接口
router.post('/register',(req,res,next)=>{
    let {username,password,password2}=req.body;

    //判断是否是空白的
    if(!username || !password || !password2)
    {
      res.redirect('/register')
      return
    }

    //判断两次密码是否同样
    if(password != password2)
    {
      res.redirect('/register')
      return
    }

    //判断用户是否存在
    userModel.find({username,password}).then(doc=>{
      if(doc.length>0)
      {
        res.redirect('/register');
      }else
      {
        //添加新的用户
        userModel.insertMany({username,password}).then(doc=>{
          res.redirect('/login')
        })
      }
    })
    
})

//添加，修改文章接口
router.post('/text',(req,res,next)=>{
    let author=req.session.username
    let {title,content,id}=req.body;

    //判断是否有id ,因为有id是点击传递进去的，没有id是新的添加文件
    if(id)
    {
      textModel.updateOne({_id:id},{$set:{title,content,time:Date.now(),author}})
      res.redirect('/')
    }else
    {
      textModel.insertMany({title,content,time:Date.now(),author}).then(doc=>{
        res.redirect('/')
      })
    }
    
})

//退出接口
router.get('/logout',(req,res,next)=>{
  req.session.destroy()
  res.redirect('/login')
})
module.exports = router;
