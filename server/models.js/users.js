
const mongoose = require('mongoose');
const validator = require('validator');
 const jwt = require('jsonwebtoken');
 const _ = require('lodash');
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

Userschema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth';
    var token =  jwt.sign({ _id : user._id.toHexString(),access},'abc123').toString();
    user.tokens = user.tokens.concat([{access,token}]);
     return user.save().then(()=>{
      return token;
    });
};
 
var Users = mongoose.model('Users',Userschema);

module.exports = {Users};