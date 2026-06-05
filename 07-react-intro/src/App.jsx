import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

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
    </div>
  );
}

export default App;
