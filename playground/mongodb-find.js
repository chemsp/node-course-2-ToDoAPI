// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectId} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err,client)=>{
 
if(err){
    return console.log('cannot connect to MongoDB server');
}
console.log(' connected to MongoDB server');

const db = client.db('TodoApp');
db.collection('Todos').find({completed:false}).toArray().then((docs) =>{
    console.log(JSON.stringify(docs,undefined,3));

},(err)=>{
    console.log('Unable to fetch todos',err);
});
 
db.collection('Users').find({name:'Nikhil Patel'}).toArray().then((user)=>{
 console.log(JSON.stringify(user,undefined,2));

},(err)=>{
    console.log("unable to fetch records",err);
});

db.collection('Users').find().count().then((count)=>{
    console.log(`The count is : ${count}`)
},(err)=>{
    console.log('Cannot find count');
});
client.close();

});

