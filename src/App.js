import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
const Todolist = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Finance");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const api_url = "http://localhost:5000";
  const fetchTodos = async () => {
    const response = await axios.get(`${api_url}/todos`);
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (!title || !deadline) return alert("Please enter title and deadline");
    await axios.post(`${api_url}/todos`, { title, category, deadline });
    setTitle("");
    setDeadline("");
    fetchTodos();
  };

  const toggleComplete = async (id) => {
    await axios.put(`${api_url}/todos/${id}`);
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${api_url}/todos/${id}`);
    fetchTodos();
  };

  return (
    <div className="app">
      <h1><center>To-Do List</center></h1>
<center>
      <input
        type="text"
        placeholder="Add description about the Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
</center>
<center>
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="Finance">Finance</option>
        <option value="Programming">Programming</option>
        <option value="Health">Health</option>
        <option value="Other">Other</option>
      </select>
      
<input
  type="date"
  value={deadline}
  min={new Date().toISOString().split("T")[0]} 
  onChange={(e) => setDeadline(e.target.value)}
/>

</center>
<center>
      <button onClick={addTodo}>Add Todo</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              [{todo.category}] {todo.title} — <em>Due: {todo.deadline}</em>
            </span>
            <button onClick={() => toggleComplete(todo.id)}>
              {todo.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      </center>
    </div>
  );
};

export default Todolist;
