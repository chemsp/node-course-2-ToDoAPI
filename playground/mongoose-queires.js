const {Todo_1} = require('./../server/models.js/toDos');
const {Users} = require('./../server/models.js/users');
const {mongoose} = require('../server/db/mongoose');

const { ObjectID} = require('mongodb')

// const id = '5b86c80b4d0ea5426091f99c12';


// if(!ObjectID.isValid(id)){
//     console.log("ID Not Found");
// }
// Todo_1.find({
//     _id: id
// }).then((todos)=>{
//   console.log('Todos',todos);
// });

// Todo_1.findOne({
//     _id: id
// }).then((todo)=>{
//   console.log('Todo',todo);
// });

// Todo_1.findById(id).then((todo)=>{
//   console.log('Todo',todo);
// }).catch((err)=>{
//   console.log(err);
// })

var userID = '6b856e747579550e1804033e'
Users.findById(userID).then((user)=>{
    if(!user){
      return  console.log('Cannot find user with ID')
    }
    console.log("User found",user);
}).catch((e)=>{
 console.log("Invalid ID",e);
})