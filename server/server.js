var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo_1} = require('./models.js/toDos');
var { Users} = require('./models.js/users');

var app = express();

app.use(bodyParser.json());
app.post('/toDos',(req , res)=>{
   var e = req;
    var newTodo = new Todo_1({
        text :e.body.text
    });
    newTodo.save().then((doc)=>{
        res.status(200).send(doc);
    },(err)=>{
        res.status(400).send(err);
    });
});
app.listen('3000',()=>{
    console.log('app startes on port 3000');
})
 module.exports ={app};
// var newTodo = new Todo_1({
//     text : "Cooked Dinner"
// });

//  newTodo.save().then((doc)=>{
//      console.log("Todo Saved",doc);
//  },(err)=>{
//      console.log('Unable to save',err);
//  });

//  var newTodo_1 = new Todo_1({
//     text : "Pick daughter from school",
//     completed: true,
//     completedAt: 23342452
//  });
// newTodo_1.save().then((doc)=>{
//     console.log("Todo Saved",doc);
// },(err)=>{
//     console.log('Unable to save',err);
// });

// Todo_1.find((err,doc)=>{
//     console.log(JSON.stringify(doc,undefined,2));
// })



// var newUser = new Users(
//     {
//         email :'            abc@gmail.com           '
//     }
// );

// newUser.save().then((doc)=>{
//     console.log('User saved');
//     console.log(JSON.stringify(doc,undefined,2));
// },(err)=>{
//     console.log('Unable to save user',err);
// });