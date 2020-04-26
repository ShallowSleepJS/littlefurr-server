/*Step1. Connect Database*/
//1.1 get mongoose
const mongoose = require('mongoose');
//1.2 connect to db 'littlefurr_test'
mongoose.connect('mongodb://localhost:27017/littlefurr_test');
//1.3 get connection object
const conn = mongoose.connection;
//1.4 bind listener - connection.on
conn.on('connected',function(){
  console.log('Success.mongodb database connected.')
});

/*Step2. Define Models and Exports Models*/
//---UserModel---
//2.1 Define Schema
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
  profilePhoto:{type:Object},//头像 antdmobile接收传回的是对象
  gender:{type:String},//genderDB_id 'male/female'
  privacy:{type:String},//隐私设置privicyDB_id
  location:{
    country:String,
    state:String, //省直辖市/州
    city:String,
  },
});
//2.2 Define Model
const UserModel = mongoose.model('user',userSchema);
//2.3 Export Model
exports.UserModel = UserModel;


//----petListModel---for UI to show pet list-
//1. Schema
const petListSchema = mongoose.Schema({
  ownerId:{type:String, required:true},
  name:{type:String, required:true},
  profilePhoto:{type:Object},
});
//2. Model
const PetListModel = mongoose.model('petList',petListSchema);
//export
exports.PetListModel = PetListModel;
