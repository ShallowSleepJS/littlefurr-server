/*Pet Module Router*/
var express = require('express');
var router = express.Router();

const filter = {__v:0,createDate:0,ownerId:0};


const { PetListModel } = require('../db/models');

//new pet
router.post('/pet_new',function(req,res){
  //get userid from cookie
  const userid = req.cookies.userid;
  // if no userid, return login-again msg
  if(!userid){
    return res.send({code:400, msg:'请重新登录！'})
  }
  //get pet info from req
  const {name,profilePhoto} = req.body;
  //check if this pet exist by pet's name
  PetListModel.findOne({name},function(err,doc){
    if(doc){//exist
      res.send({code:400, msg:'该宠物已存在'});
    }else{
      //save new pet
      new PetListModel({
        ownerId: userid,
        name,
        profilePhoto,
      }).save(function(err,doc){
        const {name,profilePhoto} = doc;
        const pet = {name,profilePhoto};
        res.send({code:201, data:pet});
      });
    }
  });
});


//get one owner's all pet
router.get('/my_pets',function(req,res){
  //get userid from cookie
  const userid = req.cookies.userid;
  if(!userid){
    return res.send({code:400, msg:'请重新登录！'});
  }
  PetListModel.find({ownerId:userid},filter,function(err,data){
    res.send({code:200, data});
  });
});


module.exports = router;
