import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState([]);
  useEffect(function () {
    async function loadUsers() {
      let url = "http://localhost:3000/users";
      let response = await fetch(url);
      let data = await response.json();
      setUser(data);
    }
    loadUsers();
  }, []);

  function addTodo() {
    if (input === "") return;
    setTodos([...todos, input]);
    setInput("");
  }
  function deleteTodo(index) {
    setTodos(todos.filter((_, i) => i !== index));
  }
  return (
    <div>
      <h1>Todo List</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(function (task, index) {
          return (
            <li key={index}>
              {task}
              <button onClick={() => deleteTodo(index)}>Delete</button>
            </li>
          );
        })}
      </ul>
      <h2>Users from database</h2>
      <ul>
        {user.map(function (u, index) {
          return (
            <li key={index}>
              {u.name} - {u.email}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
