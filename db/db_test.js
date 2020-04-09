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
  emailAddress:{type:String, required:true},
  password:{type:String, required:true},
  securityQ1:{type:String, required:true},
  securityQ1A:{type:String, required:true},
  securityQ2:{type:String, required:true},
  securityQ2A:{type:String, required:true},
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
    securityQ1:'Dog\'name?',
    securityQ1A:'Tora',
    securityQ2:'Cat\'name?',
    securityQ2A:'Ciel',
  });
  userModel.save(function(err,doc){
    console.log('save()',err,doc);
  });
}
testSave();
//3.2 Search: find(),findOne()

//3.3 Update: findByIdAndUpdate()
//3.4 Delete: remove()
