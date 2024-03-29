import React, { useState, useEffect } from "react";
import axios from "axios";

const Todo = () => {
  const [todoName, setTodoName] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    axios
      .get("https://todo-list-28c94.firebaseio.com/todos.json")
      .then(result => {
        console.log(result);
        const todoData = result.data;
        const todos = [];
        for (const key in todoData) {
          todos.push({ id: key, name: todoData[key].name });
        }
        setTodoList(todos);
      });
  }, []);

  const inputChangeHandler = e => {
    setTodoName(e.target.value);
  };

  const todoAddHandler = () => {
    setTodoList(todoList.concat(todoName));
    axios
      .post("https://todo-list-28c94.firebaseio.com/todos.json", {
        name: todoName
      })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        onChange={inputChangeHandler}
        value={todoName}
      />
      <button type="button" onClick={todoAddHandler}>
        ADD
      </button>
      <ul>
        {todoList.map(todo => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Todo;
