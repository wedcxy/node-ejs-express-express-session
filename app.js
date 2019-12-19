var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('express-session');

require('./db/comm')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var uploadRouter = require('./routes/upload')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//配置session
app.use(session({
  secret: 'hello 1916',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000*60*60*24 }   // 一天的有效期
}))

//登录拦截
app.get('*',(req,res,next)=>{
  //1.获取用户的url
  let url=req.url;
 
  //如果用户访问登录，注册可以直接通过
  if(url === '/login' || url === '/register')
  {
    next()
  }

  //因为登录服务器和给用户绑定一个session,判断这个session是否存在
  if(req.session.username)
  {
    next()
  }else
  {
    res.redirect('/login')
  }
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/upload', uploadRouter)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
