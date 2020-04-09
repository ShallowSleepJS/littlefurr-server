const md5 = require('blueimp-md5');

//1.connect to database
//1.1 get mongoose
const mongoose = require('mongoose');
//1.2 connect the db 'littlefurr_test'
mongoose.connect('mongodb://localhost:27017/littlefurr_test');
//1.3 get connection object
const conn = mongoose.connection;
//1.4 setup listener
conn.on('connected',function(){
  console.log('Success.mongodb database connected.')
});

//2.Setup User data Model
//2.1 user Schema
const userSchema = mongoose.Schema({
  emailAddress:{type:String, required:true},//邮箱作为用户名
  password:{type:String, required:true},
  security:{//安全问题及答案
    sq1:{type:String, required:true},//sqDB_id
    sq2:{type:String, required:true},
    sq1a:{type:String, required:true},//sqDB_id
    sq2a:{type:String, required:true},
  },
  nickname:{type:String},//昵称=用于显示的用户名
  description:{type:String},//个性签名
  profilePhoto:{type:String},//用户头像
  gender:{type:String},//genderDB_id
  privacy:{type:String},//隐私设置privicyDB_id
  location:{
    country:String,
    state:String, //省直辖市/州
    city:String,
  },
});
//2.2 User Model
const UserModel = mongoose.model('user',userSchema);//constructor

//3CRUD Operation through UserModel
//3.1 New: Save()
function testSave(){
  //new UserModel instance
  const userModel = new UserModel({
    emailAddress:'suriel_s@yahoo.com',
    password:md5('12345'),
    security:{
      sq1:'Dog\'name?',//暂时使用文字测试
      sq1a:'Tora',
      sq2:'Cat\'name?',
      sq2a:'Ciel',
    },
    nickname:'ShallowSleeper',
  });
  userModel.save(function(err,doc){
    console.log('save()',err,doc);
  });
}
//3.2 Search: find(),findOne()
function testFind(){
  UserModel.find(function(err,docs){
    console.log('find()',err,docs);
  });
  UserModel.findOne({_id:'5e8ec2c3e22be92968764e0c'},function(err,doc){
    console.log('findOne()',err,doc);
  });
}
//3.3 Update: findByIdAndUpdate()
function testUpdate(){
  UserModel.findByIdAndUpdate({_id:'5e8ec2c3e22be92968764e0c'},{gender:'Female'},function(err,doc){
    //doc为修改之前的object
    console.log('findByIdAndUpdate()',err,doc);
  });
}
//3.4 Delete: remove()
function testDelete(){
  UserModel.remove({_id:'5e8ea2fc09c29d27ab5b2a0c'},function(err,doc){
    console.log('remove()',err,doc);
  });
}
