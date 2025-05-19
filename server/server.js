const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "task@123", 
  database: "todo_app",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database");
});

app.get("/todos", (req, res) => {
  db.query("SELECT * FROM todos", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post("/todos", (req, res) => {
  const { title, category, deadline } = req.body;
  const query = "INSERT INTO todos (title, category, deadline) VALUES (?, ?, ?)";
  db.query(query, [title, category, deadline], (err, result) => {
    if (err) throw err;
    res.send("Todo Added");
  });
});

app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const query = "UPDATE todos SET completed = !completed WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.send("Todo Updated");
  });
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM todos WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.send("Todo Deleted");
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
