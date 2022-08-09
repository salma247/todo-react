import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "./config";

export default function AddTodo({addNewToDo}) {
  const [todo, setTodo] = useState({
    title: "",
    completed: false,
    errors: {},
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleOnChange(e) {
    setTodo((previousState) => ({
      ...previousState,
      [e.target.title]: e.target.value,
    }));
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { errors, ...newTodo } = { ...todo };
    const isValid = validate();
    if (isValid) {
      setLoading(true);
      setError("");
      addNewToDo(newTodo);
      axios
        .post(BaseUrl + "/todos", {
          ...newTodo,
        })
        .then(() => navigate("/"))
        .catch(() => {
          setError("Unable to add todo, retry again!");
        })
        .finally(() => {
          setLoading(false);
          setTodo({
            title: "",
            completed: false,
            errors: {},
          })
          navigate("/");
        });
    }
  };

  const validate = () => {
    let errors = {};
    if (!todo.title.trim()) {
      errors.name = "text is empty!";
    }

    setTodo((previousState) => ({ ...previousState, errors }));
    return !Object.keys(errors).length;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="New Todo"
          aria-label="New Todo"
          onChange={handleOnChange}
          value={todo.title}
          title="title"
          disabled={loading}
        />
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </>
          ) : (
            "Add"
          )}
        </button>
      </div>
      <div className="text-danger my-2">{todo.errors.name}</div>
    </form>
  );
}
