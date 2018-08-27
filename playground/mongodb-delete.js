// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectId} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err,client)=>{
 
if(err){
    return console.log('cannot connect to MongoDB server');
}
console.log(' connected to MongoDB server');

const db = client.db('TodoApp');
// db.collection('Todos').deleteMany({text:'Eat launch'}).then((result) =>{
//    console.log(JSON.stringify(result,undefined,3));

// },(err)=>{
//     console.log('Unable to delete todos',err);
// });

// db.collection('Todos').deleteOne({text:'pay electric bill'}).then((result) =>{
//     console.log(JSON.stringify(result,undefined,3));
 
//  },(err)=>{
//      console.log('Unable to delete todos',err);
//  });
// client.close();  pay electric bill

db.collection('Todos').findOneAndDelete({text:'pay electric bill'}).then((result) =>{
    console.log(JSON.stringify(result,undefined,3));
 
 },(err)=>{
     console.log('Unable to delete todos',err);
 });
});

