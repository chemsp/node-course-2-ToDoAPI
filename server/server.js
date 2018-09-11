require('./config/config');
var express = require('express');
var bodyParser = require('body-parser');

const _ = require('lodash');
const {mongoose} = require('./db/mongoose');
const {Todo_1} = require('./models.js/toDos');
var { Users} = require('./models.js/users');
 const { authenticate} = require('./middleware/authenticate');

const {ObjectID} = require('mongodb')

var app = express();
  var port = process.env.PORT;
app.use(bodyParser.json());

app.get('/user/me',authenticate,(req,res)=>{
   res.send(req.user);
   //console.log(req);
});
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

app.get('/toDos',(req, res)=>{
  Todo_1.find().then((todos)=>{
    res.send({todos});
  },
  (e)=>{
    res.status(400).send(e);
  }
)
});


app.get('/toDos/:id',(req, res)=>{
   var id = req.params.id;
  
   if(!ObjectID.isValid(id)){
    res.status(404).send("Invalid ID");
} else{

    Todo_1.findById(id).then((todo)=>{
        if(!todo){
           return res.status(404).send();
        }
        res.send({todo});
       }).catch((e)=>{
        res.status(400).send(e);
    });

}
  
});

app.delete('/toDos/:id',(req,res)=>{
   var id =  req.params.id ;
   if(!ObjectID.isValid(id)){
       res.status(404).send();
   }
  
    Todo_1.findByIdAndRemove(id).then((todo)=>{
         if(!todo){
             return res.status(404).send()
         }
        res.send({
            itemdeleted: todo
        })
    },(err)=>{
        res.status(404).send(err);
    }).catch((e)=>{
        res.status(400).send(e);
    })
});


app.patch('/toDos/:id',(req,res)=>{
   var id = req.params.id;
   var body = _.pick(req.body,['completedAt','completed','text']);
 
 
    if(_.isBoolean(body.completed) && body.completed ){
        body.completedAt = new Date().getTime();
    } else{
        body.completed = false;
        body.completedAt = null;
    }
   
    Todo_1.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
        if(!todo){
            return   res.status(404).send();
        }
        res.status(200).send({todo});
    }).catch((e)=>{
        res.status(400).send(e);
    });
});

app.post('/users',(req,res)=>{
    var body = _.pick(req.body,['email','password']);
    var user = new Users(body);
    
    user.save().then((user)=>{
      // res.send(user);

     console.log(user);
      return user.generateAuthToken();
    }).then((token)=>{

        res.header({'x-auth':token}).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    });
});

app.post('/users/login',(req,res)=>{
    var body = _.pick(req.body,['email','password']);
   Users.findByCreditential(body.email,body.password).then((user)=>{
      // res.send(user);
       return user.generateAuthToken().then((token)=>{
        res.header({'x-auth':token}).send(user);
       })
   }).catch((e)=>{
      res.status(400).send(e);
   })
  
});

app.delete('/users/me/token', authenticate,(req,res)=>{
  req.user.removeToken(req.token).then(()=>{
      res.status(200).send();
  },()=>{
    res.status(400).send();
  })
});
app.listen(port,()=>{
    console.log(`app started on port ${port}`);
});
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