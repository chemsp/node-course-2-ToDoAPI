// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectId} = require('mongodb');
//  var Obj = new ObjectId();
//  console.log(Obj);
//  console.log(Obj.getTimestamp());
MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err,client)=>{
 
if(err){
    return console.log('cannot connect to MongoDB server');
}
console.log(' connected to MongoDB server');

const db = client.db('TodoApp');
// db.collection('Todos').insertOne({
//     text: "To do Somthing",
//     completed: false
// },(err,result)=>{
//     if(err){
//         return console.log('Unable to insert todo ',err);
//     }
//     console.log(JSON.stringify(result.ops,undefined,2));

    
// } );

db.collection('Users').insertOne({
    name: "Manoj Patel",
    age:37,
    location: "Parlin"
},(err,result)=>{
    if(err){
        return 'Unable to insert user';
    }
    console.log(JSON.stringify(result.ops,undefined,2));
});
client.close();

});

