var express = require('express');
var router = express.Router();
const { UserModel } = require('../db/models');
const md5 = require('blueimp-md5');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Register a Route for UserRegister
/*
1. path: /register
2. POST request
3. parameter: emailAddress,password,securityQ1,securityQ1A,securityQ2,securityQ2A
4. 'admin' as registered users
5. success return: {code:0, data:{}}
6. fail return:{code:1,msg:'User Exist！'}
*/
//1.get req's parameter; 2.logic; 3.return
/*仅用于测试
  router.post('/register',function(req,res){
  const { emailAddress,password,securityQ1Id,securityQ1A,securityQ2Id,securityQ2A } = req.body;
  console.log(req);
  if(emailAddress==='suriel_s@yahoo.com'){
    res.send({code:1, msg:'此用户已存在'});
  }else{
    res.send({code:0,data:{
      _id:'abc',//UserId
      EmailAddress:emailAddress,
      Password:password,
      SecurityQ1Id:securityQ1Id,
      SecurityQ1A:securityQ1A,
      SecurityQ2Id:securityQ2Id,
      SecurityQ2A:securityQ2A,
    }});
  }
});*/

//Register router
router.post('/register',function(req,res){
  //1. get request data
  const { emailAddress,password,securityQ1Id,securityQ1A,securityQ2Id,securityQ2A } = req.body;
  //2. operate data: check if user exist
  UserModel.findOne({emailAddress},function(err,doc){
    if(doc){
      //user already exist
      res.send({code:1,msg:'用户已存在'});
    }else{
      //save user to db
      new UserModel({
        emailAddress,
        password:md5(password),
        security:{
          sq1:securityQ1Id,
          sq1a:securityQ1A,
          sq2:securityQ2Id,
          sq2a:securityQ2A,
        },
      }).save(function(err,user){
        //register后默认已login。可用cookie或session。
        //generate cookie(userid:user._id) for browser 24hr
        res.cookie('userid',user._id,{maxAge:1000*60*60*24});
        const data = {
          _id:user._id,
          emailAddress,
          security:{
            sq1:securityQ1Id,
            sq1a:securityQ1A,
            sq2:securityQ2Id,
            sq2a:securityQ2A,
          }
        };
        res.send({code:0,data});
      });
    }
  });

  //3. response
});


//Login router

module.exports = router;
