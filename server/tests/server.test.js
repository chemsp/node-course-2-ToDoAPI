const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const { Todo_1 } = require('../models.js/toDos');

const { ObjectID} = require('mongodb')


const toDos = [{
    _id : new ObjectID(),
    text:"To do Somthing test 1"
},
{
    _id : new ObjectID(),
    text:"To do Somthing test 2"
},
{
    _id : new ObjectID(),
    text:"To do Somthing test 3"
}]

beforeEach((done)=>{
    Todo_1.remove({}).then(
        Todo_1.insertMany(toDos)
    ).then(()=>done());
});

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
          expect(res.body.text).toBe(toDos[0].text)
        })
        .end(done);
    });

    it('should return 404 for item not found',(done)=>{
      _idy  = new ObjectID();
      request(app)
      .get(`/toDos/${_idy.toHexString()}`)
      .expect(200)
      .end(done);
    });

    it('should return 404 for Invalid Id',(done)=>{
       
        request(app)
        .get('/toDos/123')
        .expect(404)
        .end(done);
      });
});