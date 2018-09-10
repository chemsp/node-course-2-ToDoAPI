const {ObjectID} = require('mongodb');
const {Todo_1} = require('../../models.js/toDos');
const {Users} = require('../../models.js/users');
const jwt   = require('jsonwebtoken');
var userOneId = new ObjectID();

var userTwoId = new ObjectID();
const users = [
    {
        _id : userOneId,
        email: "sunil@example.com",
        password: 'userOnePass',
        tokens : [ { 
              access : 'auth',
              token : jwt.sign({  _id : userOneId, access:'auth'},'abc123').toString()
             }  ]
    },{
        _id : userTwoId,
        email: "margi@example.com",
        password: 'userTwoPass',
        
    }
];
const toDos = [{
    _id : new ObjectID(),
    text:"To do Somthing test 1"
},
{
    _id : new ObjectID(),
    text:"To do Somthing test 2",
    completed: true,
    completedAt : 1234   
},
{
    _id : new ObjectID(),
    text:"To do Somthing test 3"
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