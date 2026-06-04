// import Express — like querySelector but for server packages
const express = require("express");

// create the app
const app = express();

// define a route — when someone visits "/" send back "Hello World"
app.get("/", function (req, res) {
  res.send("Hello World - testing npm start2");
});
app.get("/about", function (req, res) {
  res.send("This is the about page");
});
app.get("/user", function (req, res) {
  res.json({
    name: "Beshoy",
    age: 25,
    role: "developer",
  });
});

app.get("/user/:name", function (req, res) {
  // :name is a parameter — whatever the user types in the URL
  // Express captures it and puts it in req.params
  let name = req.params.name;

  res.json({
    name: name,
    message: "Hello " + name,
  });
});

// start the server on port 3000
app.listen(3000, function () {
  console.log("Server running on http://localhost:3000");
});
