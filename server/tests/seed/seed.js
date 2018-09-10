const {ObjectID} = require('mongodb');
const {Todo_1} = require('../../models.js/toDos');

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

module.exports = {toDos, populateTodos};