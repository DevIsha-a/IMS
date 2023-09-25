const mongoose = require('mongoose');

const TodoModel = mongoose.Schema({
  title: {type: String, required: true,},
  isDeleted: {type: Boolean, default: false, required: true}
});

module.exports = mongoose.model('todo', TodoModel, 'Todos');