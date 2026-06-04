// import Express — like querySelector but for server packages
require("dotenv").config();

const User = require("./User");
const express = require("express");
const mongoose = require("mongoose");

// create the app
const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(function () {
    console.log("Connected to MongoDB");
  })
  .catch(function (error) {
    console.log("Connection failed:", error);
  });

// create a new user
app.get("/users/create", async function (req, res) {
  let user = new User({
    name: "Beshoy",
    email: "beshoy@email.com",
    age: 25,
  });
  await user.save();
  res.json({ message: "User created", user: user });
});

// get all users
app.get("/users", async function (req, res) {
  let users = await User.find();
  res.json(users);
});

// start the server on port 3000
app.listen(3000, function () {
  console.log("Server running on http://localhost:3000");
});
