var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var connectionString = {
    mlab:"mongodb://sunil:sunil1234@ds137812.mlab.com:37812/todoapp",
    localhost : "mongodb://localhost:27017/TodoApp"
}
mongoose.connect(process.env.PORT?connectionString.mlab : connectionString.localhost,{ useNewUrlParser: true });

module.exports = {
    mongoose : mongoose
};