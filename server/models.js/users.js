
const mongoose = require('mongoose');
const validator = require('validator');
 const jwt = require('jsonwebtoken');
 const _ = require('lodash');
const bcrypt   = require('bcryptjs');

var Userschema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        validate:{
            validator:(value)=>{   // or   validate : validator.isEmail;
                return validator.isEmail(value);
            },
           message: '{VALUE} is not valid email'
        }, 
        minlength: 1,
        trim: true
    },
    password:{
        type: String,
        required : true,
        minlength: 6
    },
    tokens : [{
        access:{
            type : String,
            required: true
        },
        token :{
            type : String,
            required: true
        }
    }]
});
 Userschema.methods.toJSON = function(){
    var user = this;
    return _.pick(user,['_id','email']);
 };

Userschema.statics.findByCreditential = function(email,password){
    var User = this
  return  User.findOne({email}).then((user)=>{
        if(!user){
            return Promise.reject();
        }

        return new Promise((resolve,reject)=>{
        bcrypt.compare(password,user.password,(err,success)=>{
         if(success){
             resolve(user);
         }
         else{
             reject('Not autherized');
         }
        });        
        });
    });
}

Userschema.statics.findByToken = function(token){
     var User = this;
     var decoded;
     try{
         decoded = jwt.verify(token,process.env.JWT_SECRET);

     } catch(e){
         return Promise.reject();

     }
    
     return User.findOne({
             
         '_id' : decoded._id,
         'tokens.token': token,
         'tokens.access':'auth'
     });
};
Userschema.pre('save',function(next){
    var user = this;
    
   if(user.isModified('password')){
     
       bcrypt.genSalt(10,(err,salt)=>{
           bcrypt.hash(user.password,salt,(err,hash)=>{
                 user.password = hash;
                 next();
                 console.log(user.password);
           });
                 
       });
    
         
   } else{
     
    next();
   }
  
});

Userschema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth';
    var token =  jwt.sign({ _id : user._id.toHexString(),access},process.env.JWT_SECRET).toString();
    user.tokens = user.tokens.concat([{access,token}]);
     return user.save().then(()=>{
      return token;
    });
};
 
Userschema.methods.removeToken = function(token){
    var user = this;
   // console.log(token);
    return user.update({
        $pull:{
            tokens:{ token}
        }
    });
};
var Users = mongoose.model('Users',Userschema);

module.exports = {Users};