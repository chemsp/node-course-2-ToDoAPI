var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://sunil:sunil1234@ds137812.mlab.com:37812/todoapp',{ useNewUrlParser: true });

module.exports = {
    mongoose : mongoose
};