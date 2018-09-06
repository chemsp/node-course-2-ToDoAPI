
const mongoose = require('mongoose');
const validator = require('validator');

var Users = mongoose.model('Users',{
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

module.exports = {Users};