const TodoModel = require('../Models/todoModel');

const Todo = TodoModel;

const Controllers = {
  AddTodo: async (req, res) => {
    const x = req.body;
    // CHECK TODO ALREADY EXIST
    const alreadyExist = await Todo.findOne({title: x.title});
    if(alreadyExist){
      return res.send({ message: "This title is already existed", messageType: "warning" });
    };

    // ADD TODO
    const response = await Todo.create({
      title: x.title
    }).then((result) => {
      return result ? { message: "This title is created succesfully", messageType: "success" } : {message: "Could not register the todo", messageType: "error"};
    }).catch((err) => {
      console.log(err);
    });
    return res.send(response);
  },

  // GET ALL TODOS
  GetAllTodos: async (req, res) => {
    const response = await Todo.find({isDeleted: false}).select('title')
    .then((AllTodos) => {
      return AllTodos.length ? {message: "Got all todos", messageType: "success", AllTodos} : {message: "The data you're looking for doesn't exist", messageType: "error"}
    }).catch((err) => {
      console.log(err);
    });
    return res.send(response);
  },

  // UPDATE TODO
  UpdateTodo: async (req, res) => {
    const {id} = req.params;
    const x = req.body;

    const response = await Todo.findByIdAndUpdate(id , {title: x.title}, {new: true}).then((result)=> {
      return result ? {message: "Todo updated successfully", messageType: "success"} : {message: "Data you want to update is not found", messageType: "error"}
    }).catch((err)=>{
      console.log(err);
    })
    return res.send(response);
  },

  // DELTE SUCCFULLY
  DeleteTodoSoft: async (req, res) => {
    const {id} = req.params;
    const x = req.body;

    const response = await Todo.findByIdAndUpdate(id, {isDeleted: true}, {new: true}).then((del)=> {
      return del ? {message: "This todo deleted successfully", messageType: "success"} : {message: "Data you want to delete is not found", messageType: "error"} 
    }).catch((err) => {
      console.log(err);
    })
    return res.send(response);
  }
}

module.exports = Controllers;