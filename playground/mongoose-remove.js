const {Todo_1} = require('./../server/models.js/toDos');
const {Users} = require('./../server/models.js/users');
const {mongoose} = require('../server/db/mongoose');

const { ObjectID} = require('mongodb')

// removes all data from document
Todo_1.remove({}).then((todo)=>{
    console.log(todo);
});

// remove by Id
Todo_1.findByIdAndRemove('1233').then((todo)=>{
    console.log(todo);
});

// find one and delete one
Todo_1.findOneAndRemove({
    _id : 'ffgddf4343434'
}).then((todo)=>{
    console.log(todo);
})