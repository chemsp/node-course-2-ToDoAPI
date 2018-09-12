const {ObjectID} = require('mongodb');
const {Todo_1} = require('../../models.js/toDos');
const {Users} = require('../../models.js/users');
const jwt   = require('jsonwebtoken');
var userOneId = new ObjectID();

var userTwoId = new ObjectID();

var userThreeId = new ObjectID();
const users = [
    {
        _id : userOneId,
        email: "sunil@example.com",
        password: 'userOnePass',
        tokens : [ { 
              access : 'auth',
              token : jwt.sign({  _id : userOneId, access:'auth'},process.env.JWT_SECRET).toString()
             }  ]
    },{
        _id : userTwoId,
        email: "margi@example.com",
        password: 'userTwoPass',
        tokens : [ { 
            access : 'auth',
            token : jwt.sign({  _id : userTwoId, access:'auth'},process.env.JWT_SECRET).toString()
           }  ]
        
    }
];
const toDos = [{
    _id : new ObjectID(),
    text:"To do Somthing test 1",
    _creator : userOneId
},
{
    _id : new ObjectID(),
    text:"To do Somthing test 2",
    completed: true,
    completedAt : 1234 ,
    _creator:userTwoId  
},
{
    _id : new ObjectID(),
    text:"To do Somthing test 3",
    _creator: userThreeId
}];



const populateTodos = (done)=>{
    Todo_1.remove({}).then(
        Todo_1.insertMany(toDos)
    ).then(()=>done());
}

const populateUsers = (done)=>{
    Users.remove({}).then(()=>{
        var userOne = new Users(users[0]).save();
        var userTwo = new Users(users[1]).save();

       return Promise.all([userOne,userTwo])
    }).then(()=>done());
};
module.exports = {toDos, populateTodos,users, populateUsers};