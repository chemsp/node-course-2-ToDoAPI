const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const { Todo_1 } = require('../models.js/toDos');
const { Users } = require('../models.js/users');
const { toDos, populateTodos, users, populateUsers} = require('../tests/seed/seed');
const { ObjectID} = require('mongodb')


// const toDos = [{
//     _id : new ObjectID(),
//     text:"To do Somthing test 1"
// },
// {
//     _id : new ObjectID(),
//     text:"To do Somthing test 2",
//     completed: true,
//     completedAt : 1234   
// },
// {
//     _id : new ObjectID(),
//     text:"To do Somthing test 3"
// }]

 beforeEach(populateUsers);

beforeEach(populateTodos);

describe('Post /toDos',()=>{
  
  it('should post data',(done)=>{
  var text = 'Test toDo text';
    request(app)
    .post('/toDos')
    .send({text})
    .expect(200)
    .expect((res)=>{
       expect(res.body.text).toBe(text);
    })
    .end((err,res)=>{
        if(err){
            return done(err);
        }
        Todo_1.find({text}).then((todos)=>{
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
        }).catch((e)=>{
          done(e);
        })
    })
  });


  it('should not create empty', (done)=>{
      request(app)
      .post('/toDos')
      .send({})
      .expect(400)
 
  .end((err,res)=>{
      if(err){
          return done(err);
      }
      
      Todo_1.find().then((todo)=>{
        //  console.log(todo);

        expect(todo.length).toBe(3);
        done();
    }).catch((e)=>done(e));
  })
})
});

describe('GET /Todos',()=>{
    it('should return toDos',(done)=>{
    
        request(app)
        .get('/toDos')
        .expect(200)
        .expect((res)=>{
            debugger;
            expect(res.body.todos.length).toBe(3);
            
        })
        .end((err,res)=>{
          if(err){
              return(done(err));
          }
          done();
        })
    });
});

describe('Get /toDo:id',()=>{
    it('should return toDo doc',(done)=>{

        request(app)
        .get(`/toDos/${toDos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
          expect(res.body.todo.text).toBe(toDos[0].text)
        })
        .end(done);
    });

    it('should return 404 for item not found',(done)=>{
      _idy  = new ObjectID();
      request(app)
      .get(`/toDos/${_idy.toHexString()}`)
      .expect(404)
      .end(done);
    });

    it('should return 404 for Invalid Id',(done)=>{
       
        request(app)
        .get('/toDos/e123')
        .expect(404)
        .end(done);
      });
});


describe('Delete Todo',()=>{

    it('should delete toDo',(done)=>{
     
        request(app)
        .delete(`/toDos/${toDos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
           expect(res.body.itemdeleted._id).toBe(toDos[0]._id.toHexString());
         //   done()
        })
        .end((err)=>{
            if(err){
                return done(err);            
            }
            Todo_1.findById(toDos[0]._id.toHexString()).then((todo)=>{
                expect(todo).toBeNull();
                done();
            }).catch((e)=>done(e));
        });
    });

    it('should return 404 for item not found',(done)=>{
        _idy  = new ObjectID();
        request(app)
        .delete(`/toDos/${_idy.toHexString()}`)
        .expect(404)
        .end((err)=>{
            if(err){
                return done(err);            
            }
            done();
        });
      });
  
      it('should return 404 for Invalid Id',(done)=>{
         var hexID = new ObjectID();
        request(app)
        .delete(`/toDos/${hexID.toHexString()}`)
        .expect(404)
        .end((err)=>{
            if(err){
                return done(err);            
            }
            done();
        });
      });
 });


describe('Patch Todo',()=>{

    it('should Patch toDo',(done)=>{
        var hexID = toDos[0]._id.toHexString();
         var  text = "New test texts";
       
        request(app)
        .patch(`/toDos/${hexID}`)
        .send({
            text,
            completed:true
                  
        })
        .expect(200)
        .expect((res)=>{
          console.log(res.body);
           expect(res.body.todo.completed).toBe(true);
           expect(res.body.todo.text).toBe(text);
          expect( typeof res.body.todo.completedAt).toBe('number');
          // console.log(res.body.toDos);
        })
        .end(done);
    });

    it('should clear completedAt when to do is not completed',(done)=>{
        var  text = "New test text";
        request(app)
        .patch(`/toDos/${toDos[1]._id.toHexString()}`)
        .send({
           completed : false,
           text
        })
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.text).toBe(text);
           expect(res.body.todo.completedAt).toBeNull();
           
        })
        .end( done);
      });
  
     
});

describe('Get /user/me',()=>{
    it('should return user if authenticated',(done)=>{
       request(app)
       .get('/user/me')
       .set('x-auth',users[0].tokens[0].token)
       .expect(200)
       .expect((res)=>{
           expect(res.body._id).toBe(users[0]._id.toHexString())
           expect(res.body.email).toBe(users[0].email)
       })
       .end(done)
    });

    it('should not return anything if non authenticated ',(done)=>{
        request(app)
       .get('/user/me')
       .expect(401)
       .expect((res)=>{
           expect(res.body).toEqual({});
        
       })
       .end(done)

    })
});

describe('POST /USers',()=>{
 it('should create user',(done)=>{
     var email = 'chemsp@example.com';
     var password = 'chemspPass';

     request(app)
     .post('/users')
     .send({email,password})
     .expect(200)
     .expect((res)=>{
         expect(res.body._id).toExist;
       expect(res.headers['x-auth']).toExist;
         expect(res.body.email).toBe(email);
     })
     .end((err)=>{
         if(err){
          return done(err);
         }

         Users.findOne({email}).then((user)=>{
           expect(user.password).not.toBe(password);
             expect(user).toBeTruthy() ;
             done();
         });
     });
 });
 
 it('should give validation error for invalid email or password ',(done)=>{
   
    request(app)
    .post('/users')
    .send({email: 'avad', password:'124'})
    .expect(400)
    .end(done)
 });

  
 it('should give  error for  email already in use ',(done)=>{
   
    request(app)
    .post('/users')
    .send({email: users[0].email, password:1245677787})
    .expect(400)
    .end(done)
 });
});


describe('POST /users/login',()=>{
    
    it('should login user and return  auth token ',(done)=>{
      
       request(app)
       .post('/users/login')
       .send({
           email:users[1].email,
           password: users[1].password
        })
       .expect(200)
       .expect((req)=>{
         expect( req.headers['x-auth']).toBeTruthy();
       })
       .end((err,req)=>{
           if(err){
               return done(err);
           }
          Users.findById({_id: users[1]._id}).then((user)=>{
              expect(user.tokens[0]).toHaveProperty(   'access','auth');
              expect(user.tokens[0]).toHaveProperty(   'token' , req.headers['x-auth']);
              
              done()
          }).catch((e)=>done(e));
       })
    });
   
    it('should reject invalid login',(done)=>{
        request(app)
        .post('/users/login')
        .send({
            email:users[1].email ,
            password: users[1].password + 1
         })
        .expect(400)
        .expect((req)=>{
          expect( req.headers['x-auth']).toBeFalsy();
        })
        .end((err,req)=>{
            if(err){
                return done(err);
            }
           Users.findById({_id: users[1]._id}).then((user)=>{
               expect(user.tokens.length).toEqual(0);
               
               done()
           }).catch((e)=>done(e));
        })
     });
     
    it('should give  error for  email already in use ',(done)=>{
      
       request(app)
       .post('/users')
       .send({email: users[0].email, password:1245677787})
       .expect(400)
       .end(done)
    });
   });