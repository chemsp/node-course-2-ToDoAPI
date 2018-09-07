const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');


// var message = "I am user number 3";
// var hash = SHA256(message);
// console.log(`message : ${message}`);


// console.log(`hash : ${hash}`);

var  data ={
    id : 10
}

token = jwt.sign(data,'secretkey');
console.log(`token : ${token}`);

 var decode = jwt.verify(token,'secretkey');

console.log(`decode : ${JSON.stringify(decode)}`);
