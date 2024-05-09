const router = require('express').Router();
const Controllers = require('../Controllers/TodoController');

router.post('/todo/add-todo', Controllers.AddTodo);
router.get('/todo/get-todo', Controllers.GetAllTodos);
router.put('/todo/update-todo/:id', Controllers.UpdateTodo);
router.patch('/todo/delete-todo/:id', Controllers.DeleteTodoSoft);

module.exports = router;