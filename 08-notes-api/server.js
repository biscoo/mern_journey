// ============================================================
// SETUP & IMPORTS
// ============================================================

// load environment variables from .env file FIRST
// so process.env.MONGO_URI is available before anything else runs
// INTERVIEW Q: Why must dotenv be configured before other imports?
require("dotenv").config();

// express — framework for building the server and routes
// INTERVIEW Q: What is Express and why use it instead of raw Node.js?
const express = require("express");

// mongoose — connects to MongoDB and lets us define models/schemas
// INTERVIEW Q: What is Mongoose and what problem does it solve?
const mongoose = require("mongoose");

// cors — allows requests from different origins (e.g. React on port 5173)
// INTERVIEW Q: What is CORS and why do we need it?
const cors = require("cors");

// our Note model — defines the shape of a note document in MongoDB
// INTERVIEW Q: What is a Mongoose model?
const Note = require("./Note");

// ============================================================
// APP INITIALIZATION
// ============================================================

const port = 3000;

// create the Express application
// INTERVIEW Q: What does express() return?
const app = express();

// ============================================================
// MIDDLEWARE
// middleware runs on EVERY request before it reaches any route
// ============================================================

// allow cross-origin requests from the frontend
// INTERVIEW Q: What happens if you remove app.use(cors())?
app.use(cors());

// parse incoming JSON request bodies into req.body
// INTERVIEW Q: What is req.body and why is express.json() needed?
app.use(express.json());

// ============================================================
// DATABASE CONNECTION
// ============================================================

// connect to MongoDB Atlas using the URI stored in .env
// .then() runs if connection succeeds
// .catch() runs if connection fails — server still starts but DB won't work
// INTERVIEW Q: Why store the connection string in .env instead of hardcoding it?
// INTERVIEW Q: What is the difference between .then()/.catch() and async/await?
mongoose
  .connect(process.env.MONGO_URI)
  .then(function () {
    console.log("Connected to MongoDB");
  })
  .catch(function (err) {
    console.error("Error connecting to MongoDB:", err);
  });

// ============================================================
// ROUTES
// each route handles a specific HTTP method + URL combination
// INTERVIEW Q: What is a REST API?
// INTERVIEW Q: What are the 4 HTTP methods and what does each represent?
// ============================================================

// GET /notes — return all notes from the database
// INTERVIEW Q: What does Note.find() return when the collection is empty?
// INTERVIEW Q: Why is this function async?
app.get("/notes", async function (req, res) {
  try {
    let notes = await Note.find(); // get all documents from notes collection
    res.json(notes); // send them as JSON response
  } catch (err) {
    console.error("Error fetching notes:", err);
    // 500 = Internal Server Error — something went wrong on our side
    // INTERVIEW Q: What is the difference between a 404 and a 500 error?
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /notes/:id — return one specific note by its id
// :id is a URL parameter — accessible via req.params.id
// INTERVIEW Q: What is req.params and how is it different from req.body?
app.get("/notes/:id", async function (req, res) {
  try {
    let note = await Note.findById(req.params.id); // find by MongoDB _id

    // findById returns null if not found — not an error, so catch won't run
    // we handle null manually with a 404
    // INTERVIEW Q: Why do we need to check for null here instead of relying on catch?
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
      // return stops the function — without it res.json() below would also run
      // INTERVIEW Q: Why do we use return before res.status(404)?
    }

    res.json(note);
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT /notes/:id — update a specific note
// INTERVIEW Q: What is the difference between PUT and PATCH?
app.put("/notes/:id", async function (req, res) {
  try {
    // findByIdAndUpdate — finds and updates in one database call
    // req.body contains the new data sent by the client
    // { new: true } returns the UPDATED document, not the original
    // INTERVIEW Q: What would happen if you removed { new: true }?
    let updated = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(updated); // send back the updated note
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /notes/:id — delete a specific note
// INTERVIEW Q: Why do we always delete by id and not by title or content?
app.delete("/notes/:id", async function (req, res) {
  try {
    // findByIdAndDelete — finds and removes in one database call
    // returns the deleted document, or null if not found
    let deleted = await Note.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(deleted); // send back the deleted note as confirmation
    // INTERVIEW Q: What else could you send back after a successful delete?
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /notes — create a new note
// INTERVIEW Q: Why does POST go after GET/PUT/DELETE in the file?
// (it doesn't matter technically, but convention is GET first)
app.post("/notes", async function (req, res) {
  try {
    // create a new Note instance using data from req.body
    // req.body.title and req.body.content come from the JSON sent by the client
    // INTERVIEW Q: What happens if req.body.title is undefined?
    let newNote = new Note({
      title: req.body.title,
      content: req.body.content,
      // createdAt is not needed here — the schema default handles it automatically
    });

    // .save() writes the document to MongoDB
    // INTERVIEW Q: What is the difference between new Note() and Note.create()?
    let savedNote = await newNote.save();

    res.json(savedNote); // send back the created note including its _id
  } catch (err) {
    console.error("Error saving note:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ============================================================
// START SERVER
// ============================================================

// start listening for incoming requests on the specified port
// INTERVIEW Q: What is a port and why do we use 3000 for development?
// INTERVIEW Q: What port would you use in production?
app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
