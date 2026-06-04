// import Express — like querySelector but for server packages
require("dotenv").config();

const User = require("./User");
const express = require("express");
const mongoose = require("mongoose");

// create the app
const app = express();
// allows Express to read JSON data sent in request body
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(function () {
    console.log("Connected to MongoDB");
  })
  .catch(function (error) {
    console.log("Connection failed:", error);
  });

// GET all users
app.get("/users", async function (req, res) {
  let users = await User.find();
  res.json(users);
});

// GET one user by id
app.get("/users/:id", async function (req, res) {
  let user = await User.findById(req.params.id);
  res.json(user);
});

// POST — create a new user
app.post("/users", async function (req, res) {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
  });
  await user.save();
  res.json({ message: "User created", user: user });
});

// DELETE — remove a user by id
app.delete("/users/:id", async function (req, res) {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

// start the server on port 3000
app.listen(3000, function () {
  console.log("Server running on http://localhost:3000");
});
