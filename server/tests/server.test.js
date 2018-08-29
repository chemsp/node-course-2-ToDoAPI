const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const { Todo_1} = require('../models.js/toDos');

describe('Post /toDos',()=>{
    beforeEach((done)=>{
        Todo_1.remove({}).then(()=>done());
    })
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
        Todo_1.find().then((todos)=>{
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
        expect(todo.length).toBe(0);
        done();
    }).catch((e)=>done(e));
  })
})
});