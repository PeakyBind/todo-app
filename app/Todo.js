let mongoose = require('mongoose');

let todo = new mongoose.Schema({
  name: {
    type: String
  },
  done: {
    type: Boolean
  }
},
  {
    collection: 'todos'
  }
);

module.exports = mongoose.model('todo', todo);
