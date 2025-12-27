const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [
  { id: 1, name: "John Doe", email: "john@test.com", role: "Admin", status: "Active" },
  { id: 2, name: "Alice Smith", email: "alice@test.com", role: "User", status: "Inactive" }
];

// GET – list users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// POST – create user
app.post("/api/users", (req, res) => {
  const newUser = {
    id: Date.now(),
    ...req.body
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT – update user
app.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  users = users.map(user =>
    user.id === id ? { ...user, ...req.body } : user
  );
  res.json({ message: "User updated" });
});

// DELETE – delete user
app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  users = users.filter(user => user.id !== id);
  res.json({ message: "User deleted" });
});

app.listen(3000, () => {
  console.log("Backend running at http://localhost:3000");
});
