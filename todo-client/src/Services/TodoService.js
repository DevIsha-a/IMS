import AppInstance from "../Config/global.axios";

export class TodoService {
  // ADD TODO
  async CreateTodo(todo) {
    const response = await AppInstance({
      url: '/todo/add-todo',
      method: 'POST',
      data: todo
    });
    return response;
  }

  // GET ALL TODO
  async GetAllTodos(search) {
    const response = await AppInstance({
      url: `/todo/get-todo?search=${search}`,
      method: 'GET'
    });
    return response;
  }

  // UPDATE TODO
  async UpdateSingleTodo(id, todo) {
    const response = await AppInstance({
      url: `todo/update-todo/${id}`,
      method: 'PUT',
      data: todo
    })
    return response;
  }
  // DELETE TODO
  async DeleteTodos(id) {
    const response = await AppInstance({
      url: `/todo/delete-todo/${id}`,
      method: 'PATCH'
    });
    return response;
  }
}