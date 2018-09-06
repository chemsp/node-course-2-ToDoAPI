
var env = process.env.NODE_ENV || 'development';


var uri = "mongodb://sunil:sunil1234@ds137812.mlab.com:37812/todoapp"
if(env === 'development'){
    process.env.PORT = 3000;
    uri = "mongodb://localhost:27017/TodoApp_1";
    process.env.MONGODB_URI = "mongodb://localhost:27017/TodoApp_1";
    
} else if(env.trim() === 'test'){
    process.env.PORT = 3000;
    uri = "mongodb://localhost:27017/TodoApp_1_Test";
    process.env.MONGODB_URI = "mongodb://localhost:27017/TodoApp_1_test"
}
console.log(process.env.NODE_ENV);
console.log( process.env.PORT);
console.log( process.env.MONGODB_URI);