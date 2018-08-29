// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectId} = require('mongodb');
//  var Obj = new ObjectId();
//  console.log(Obj);
//  console.log(Obj.getTimestamp());
 // mongodb://localhost:27017/TodoApp
MongoClient.connect('mongodb://chemsp:Asthasp5!@ds137812.mlab.com:37812/todoapp',{ useNewUrlParser: true },(err,client)=>{
 
if(err){
    return console.log('cannot connect to MongoDB server');
}
console.log(' connected to MongoDB server');

const db = client.db('todoapp');
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

