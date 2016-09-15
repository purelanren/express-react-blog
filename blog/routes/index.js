// var express = require('express');
// var router = express.Router();
// module.exports = router;
// require('babel-core/register');
var Reg = require('../models/login/reg');
var Login = require('../models/login/login');
var CheckLogin = require('../models/common').CheckLogin;
var CheckNotLogin = require('../models/common').CheckNotLogin;
var Post = require('../models/post/post');
var Result = require('../server/resultMap');
module.exports = function (app) {
  /* GET home page. */
  app.get('*', function (req, res) {
    console.log('caozheng show that');
    Post.get(null, function (err, posts) {
      if (err) {
        posts = [];
      }
      res.render('index', {
        title: '主页',
        user: req.session.user,
        posts: posts,
        success: req.flash('success').toString(),
        error: req.flash('error').toString(),
        env : 'development',
        pageAuthor:['01','02','03'].toString()
      });
    });
  });
  // /*注册get*/
  // app.get('/reg',CheckNotLogin);
  // app.get('/reg', function (req, res) {
  //   res.render('reg', {
  //     title: '注册',
  //     user: req.session.user,
  //     success: req.flash('success').toString(),
  //     error: req.flash('error').toString()
  //   });
  // });
  // /*注册post*/
  // app.post('/reg',CheckNotLogin);
  app.post('/reg', function (req, res) {
    console.log('reg from router $$$$$$$$$$$$$$$$$$$');
    Reg(req,res);
  });
  //
  // app.get('/login',CheckNotLogin);
  // app.get('/login', function (req, res) {
  //   res.render('login', {
  //     title: '登录',
  //     user: req.session.user,
  //     success: req.flash('success').toString(),
  //     error: req.flash('error').toString()});
  //
  // });
  // app.post('/login',CheckNotLogin);
  app.post('/login', function (req, res) {
    console.log('login router');
    Login(req,res)
  });
  //
  // app.get('/post',CheckLogin);
  // app.get('/post', function (req, res) {
  //   res.render('post',{
  //     title : '文章',
  //     user : req.session.user,
  //     success : req.flash('success').toString(),
  //     error : req.flash('error').toString()
  //   });
  // });
  // app.post('/post',CheckLogin);
  // app.post('/post', function (req, res) {
  //   let currentUser = req.session.user,
  //       post  = new Post(currentUser.name,req.body.title,req.body.post);
  //   post.save(function (err) {
  //     if (err){
  //       req.flash('error',err);
  //       return res.redirect('/')
  //     }
  //     req.flash('success','发布成功!');
  //     res.redirect('/')
  //   });
  // });
  // app.get('/logout',CheckLogin);
  // app.get('/logout', function (req, res) {
  //   req.session.user = null;
  //   req.flash('success', '登出成功!');
  //   res.redirect('/');//登出成功后跳转到主页
  // });

  // app.get('/getPost',function (req,res) {
  //   let user = req.session.user,
  //       data = {user : user};
  //   if (!user){
  //     res.send(Result.set(false,'查找不到sessionUser',{}))
  //   }
  //   //TODO
  //   res.status(200).send(Result.set(true,'成功',{name:'caozheng'}))
  // })
  app.post('/post/savePost',function (req,res) {
    //TODO
    let sessionUser = req.session.user,
        data = JSON.parse(req.body.d);
    /*tostring 是为了防止有0的输入*/
    if (req.session.user&&data.title.toString()&&data.body.toString()){
      new Post(sessionUser.name,data.title,data.body).save(function (err) {
        if (err){
          res.send(Result.set(false,'失败',{msg:err}))
        }else {
          res.send(Result.set(true,'成功',{}));
        }
      })
    }else {
      res.send(Result.set(false,'失败',{msg:'传参数错误！'}))
    }
        // post  = new Post(sessionUser.name,req.body.title,req.body.post);

    // res.status(200).send(Result.set(true,'成功',{name:'caozheng'}))
  })
};