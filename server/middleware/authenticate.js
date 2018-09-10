var {Users} = require('../models.js/users');

var authenticate = (req,res,next)=>{
    var token  = req.header('x-auth');
   // console.log(token);
    Users.findByToken(token).then((user)=>{
      
        if(!user){
            return Promise.reject()
        }
        req.user = user;
        req.token = token;
      //  console.log( res.user );
    
        next();
    }).catch((e)=>{
        res.status(401).send();
    });

};

module.exports ={authenticate};
