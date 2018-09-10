const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const { Todo_1 } = require('../models.js/toDos');
const { toDos, populateTodos} = require('../tests/seed/seed');
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
             done()
        })
        .end((err,res)=>{
          if(err){
              return(done(err));
          }
         
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
        .end( done())
      });
  
     
});