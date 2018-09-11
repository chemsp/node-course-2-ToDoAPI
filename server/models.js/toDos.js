
var mongoose = require('mongoose');

var Todo_1 = mongoose.model('Todo_1',{
    text : {
        type: String,
        required: true,
        minlength:1,
        trim: true
    },
    completed:{
        type: Boolean,
        default: false
    },
    completedAt:{
        type: Number,
        default: null
    },
    _creator :{
        type: mongoose.Schema.Types.ObjectId,
        required : true
    }
});


module.exports = {Todo_1};