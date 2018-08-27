// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err,client)=>{
 
if(err){
    return console.log('cannot connect to MongoDB server');
}
console.log(' connected to MongoDB server');

const db = client.db('TodoApp');
 var objID = new ObjectID('5b84652c2f39281ff87e6c1e');

db.collection('Todos').findOneAndUpdate({
    _id:objID },
    { $set:
        {   name:'Sunil Patel' },
    $inc: {age:1}
    },{returnOriginal:false}).then((result) =>{
    console.log(JSON.stringify(result,undefined,3));
 
 },(err)=>{
     console.log('Unable to Update todos',err);
 });
});

