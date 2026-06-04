const mongoose = require("mongoose");

// a schema defines the shape of documents in this collection
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

// create a model from the schema
// "User" becomes the "users" collection in MongoDB automatically
const User = mongoose.model("User", userSchema);

// export it so server.js can use it
module.exports = User;
