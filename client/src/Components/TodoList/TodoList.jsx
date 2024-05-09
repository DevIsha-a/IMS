import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import { TodoService } from "../../Services/TodoService";
import { MdDelete, MdEdit } from "react-icons/md";
import Swal from "sweetalert2";
import "./TodoList.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [update, setUpdate] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const { handleSubmit, register, reset, setValue, watch } = useForm();
  const searchQuery = watch("search", "");
  const Service = new TodoService();
  const submitForm = async (todo) => {
    // CREATE TODO
    if (!update) {
      const { data } = await Service.CreateTodo(todo);
      if (data.messageType === "success") {
        reset({
          title: ""
        })
        toast.success(data.message);
        getAllTodos();
      } else {
        toast.error(data.message);
      }
    }
    // UPDATE TODO
    else {
      const { data } = await Service.UpdateSingleTodo(updateId, todo);
      if (data.messageType === "success") {
        getAllTodos();
        toast.success(data.message);
        setUpdate(false)
        reset({
          title: ""
        })
      } else {
        toast.error(data.message);
      }
    }

  };

  async function getAllTodos() {
    const { data } = await Service.GetAllTodos();
    setTodos(data.AllTodos);
  }

  // UPDATE TODO HANDELER
  const handleUpdate = (id, todo) => {
    setValue("title", todo.title);
    setUpdate(true);
    setUpdateId(id);
  }

  // DELETE TODO
  const handleDelete = async (id) => {
    new Swal({
      title: "Delete Todo?",
      text: "Are you sure you want to delete this todo?",
      icon: "question",
      backdrop: true,
      allowOutsideClick: false,
      allowEnterKey: false,
      confirmButtonColor: "#ec4a58",
      confirmButtonText: "Delete",
      showDenyButton: true,
      denyButtonColor: "#6c757d",
      denyButtonText: "Cancel",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await Service.DeleteTodos(id);
          if (data?.messageType === "success") {
            getAllTodos();
            Swal.fire({
              title: 'Success!',
              text: data.message,
              icon: 'success',
            });
          }
        }
      })
  }

  const filterTodos = () => {
    if (todos) {
      if (searchQuery === "") {
        setFilteredTodos(todos); // Set filteredTodos to the entire todos array
        getAllTodos();
      } else {
        const filteredTodos = todos.filter((todo) => {
          return todo.title.toLowerCase().includes(searchQuery.toLowerCase());
        });
        setFilteredTodos(filteredTodos);
      }
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  useEffect(() => {
    filterTodos();
    getAllTodos();
  }, [searchQuery]);


  return <>
    <div className="container py-5">
      <div className="row justify-content-between pt-5">
        <div className="col-md-5">
          <h4>
            {!update ? "ADD TODO" : "UPDATE TODO"}
          </h4>
          <form onSubmit={handleSubmit(submitForm)} className="form">
            <input id="fillAllInputs" type="text" {...register("title", { required: true, maxLength: 30 })} className="form-control inp" name="title" />
            {!update ? <button type="submit" className="btn btn-success mt-4">submit</button> : <button type="submit" className="btn btn-primary mt-4">Update</button>}
          </form>
        </div>
        <div className="col-md-6 text-center">
          <div className="d-flex justify-content-between align-items-center pb-3">
            <h4>TODO LIST</h4>
            <input type="search" {...register("search")} className="form-control inp w-50" name="search" placeholder="search todo" />
          </div>
          <ul className="list-unstyled mt-2">
            {searchQuery === "" ?
              todos && todos.map((todo, i) => {
                return <li key={i} className="border d-flex justify-content-between px-2 py-2">
                  <div className="w-100 text-start" style={{ backgroundColor: "#ADEBB5", borderRadius: "5px", padding: "10px" }}>
                    {todo.title}
                  </div>
                  <div className="d-flex">
                    <button className="btn btn-primary ms-3 me-2" onClick={() => { handleUpdate(todo._id, todo) }}><MdEdit /></button>
                    <button className="btn btn-danger" onClick={() => { handleDelete(todo._id) }}><MdDelete /></button>
                  </div>
                </li>
              }) :
              filteredTodos && filteredTodos.map((todo, i) => {
                return <li key={i} className="border d-flex justify-content-between px-2 py-2">
                  <div className="w-100 text-start" style={{ backgroundColor: "#ADEBB5", borderRadius: "5px", padding: "10px" }}>
                    {todo.title}
                  </div>
                  <div className="d-flex">
                    <button className="btn btn-primary ms-3 me-2" onClick={() => { handleUpdate(todo._id, todo) }}><MdEdit /></button>
                    <button className="btn btn-danger" onClick={() => { handleDelete(todo._id) }}><MdDelete /></button>
                  </div>
                </li>
              })} 
          </ul>
        </div>
      </div>
    </div>
    <ToastContainer />
  </>
}

export default TodoList;