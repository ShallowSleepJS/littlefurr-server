var express = require('express');
var router = express.Router();
const { UserModel } = require('../db/models');
const md5 = require('blueimp-md5');
const filter = {password:0,__v:0};//filter 'password','__v'

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

//User Register router
router.post('/register',function(req,res){
  //1. get request data
  const { emailAddress,password,securityQ1Id,securityQ1A,securityQ2Id,securityQ2A } = req.body;
  //2. operate data: check if user exist
  UserModel.findOne({emailAddress},function(err,doc){
    if(doc){
      //user already exist
      res.send({code:400,msg:'用户已存在'});
    }else{
      //save user to db
      console.log('server register', emailAddress,password,securityQ1Id,securityQ1A,securityQ2Id,securityQ2A);
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
      //3. response
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
        res.send({code:201,data});
      });
    }
  });
});

//User Login router
router.post('/login',function(req,res){
  // get reqest para
  const { emailAddress,password } = req.body;
  // check if email,pwd match db
  UserModel.findOne({emailAddress,password:md5(password)},filter,function(err,user){
    if(user){
      // email&&pwd correct. login success
      res.cookie('userid',user._id,{maxAge:1000*60*60*24});
      res.send({code:201,data:user});
    }else{
      // email|pwd wrong. login fall
      res.send({code:400,msg:'用户邮箱或密码错误'});
    }
  });
});

//User Info Update Route
router.post('/update', function(req,res){
  //get userid from cookie
  const userid = req.cookies.userid;
  // if !userid, return err_msg;
  if(!userid){
    return res.send({code:400,msg:'请重新登录！'})
  }
  //get user Update-Info from req
  const {nickname,description,profilePhoto,gender,privacy,country,state,city} = req.body; //update req has no _id
  //reset user structure for location{}
  const user = {
    nickname,
    description,
    profilePhoto,
    gender,
    privacy,
    location:{country,state,city}
  }
  UserModel.findByIdAndUpdate({_id: userid},user,function(err,oldUser){
    if(!oldUser){ //!oldUser: cookie is wrong
      //tell browser del the cookie
      res.clearCookie('userid');
      //send err msg
      res.send({code:400,msg:'请重新登录！'});
    }else{
      //update success. return a newUser
      const { _id, emailAddress } = oldUser;
      //Object.assign - merge multi objects return one object
      const newUser = Object.assign(user,{ _id, emailAddress });
      //send msg
      res.send({code:201,data:newUser});
    }
  });
});

module.exports = router;
