var express = require('express');
var router = express.Router();

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
router.post('/register',function(req,res){
  const { emailAddress,password,securityQ1Id,securityQ1A,securityQ2Id,securityQ2A } = req.body;
  console.log(req);
  if(emailAddress==='suriel_s@yahoo.com'){
    res.send({code:1, msg:'此用户已存在'});
  }else{
    res.send({code:0,data:{
      UserId:'abc',
      EmailAddress:emailAddress,
      Password:password,
      SecurityQ1Id:securityQ1Id,
      SecurityQ1A:securityQ1A,
      SecurityQ2Id:securityQ2Id,
      SecurityQ2A:securityQ2A,
    }});
  }
});




module.exports = router;
