import React from "react";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import { BaseUrl } from "./config";
import AddTodo from "./AddTodo";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 
  function handleTaskDeletion(id) {
    const allTodos = [...todos];
    const updatedTodos = allTodos.filter((todo) => todo.id !== id);
    axios.delete(BaseUrl + "/todos/" + id);
    setTodos(updatedTodos);
  }


  // Fetch Todos
  function onComplete(id) {
    console.log(id);
    const allTodos = [...todos];
    const todo = allTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(allTodos);
    axios.put(BaseUrl + "/todos/" + id, todo);
  }

  useEffect(() => {
    // using axios
    setLoading(true);
    setError("");
    axios
      .get(BaseUrl + "/todos")
      .then((res) => setTodos(res.data))
      .catch(() => setError("Couldn't find todos 😥, retry later!"))
      .finally(() => setLoading(false));
  }, []); // the best way to call a backend -> as it runs only once after the component mounted

  // if promise is "pending"
  if (loading) {
    return (
      <div className="m-5">
        <Loader />
      </div>
    );
  }

  // if promise is "rejected"
  if (error) {
    return (
      <div className="alert alert-danger">
        <h3 className="text-center">{error}</h3>
      </div>
    );
  }

  function addNewToDo(newTodo){
    setTodos([...todos,newTodo])  
  }

  function handleUpdate(e,id){
    console.log(e.target.value);
    setTodos(todos.map((todo)=>{
      if(todo.id===id){
        todo.title=e.target.value;
      }
      return todo;
    }))
    axios.put(BaseUrl + "/todos/" + id, {
      title: e.target.value,
      completed: false,
    });
  }

  return (
    <section>
      <div className="container py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-8 col-xl-6">
            <div className="card rounded-3">
              <div className="card-body p-4">
                <p className="mb-2">
                  <span className="h2 me-2">My todo</span>{" "}
                </p>
                <p className="text-muted pb-2">{new Date().toDateString()}</p>

                <ul className="list-group rounded-0">
                  {
                    // map over todos
                    todos.map((todo) => (
                      <li
                        key={todo.id}
                        className="list-group-item border-0 d-flex align-items-center ps-0"
                      >
                        <input
                          className="form-check-input me-3"
                          type="checkbox"
                          value=""
                          aria-label="..."
                          onClick={() => onComplete(todo.id)}
                          checked={todo.completed}
                        />
                        <input
                          className={
                            todo.completed ? "text-decoration-line-through" : ""
                          }
                          type="text"
                          value={todo.title}
                          onChange={(e)=> handleUpdate(e, todo.id)}
                          style={{ border: "none" }}
                        />
                        <button
                          className="btn text-danger position-absolute top-0 end-0"
                          onClick={() => handleTaskDeletion(todo.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center mt-5">
            <div className="col col-lg-8 col-xl-6">
              <AddTodo addNewToDo={addNewToDo}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
