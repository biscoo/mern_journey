require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Note = require("./Note");

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(function () {
    console.log("Connected to MongoDB");
  })
  .catch(function (err) {
    console.error("Error connecting to MongoDB:", err);
  });

// get all notes
app.get("/notes", async function (req, res) {
  try {
    let notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get one note by id
app.get("/notes/:id", async function (req, res) {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// update a note by id
app.put("/notes/:id", async function (req, res) {
  try {
    let updated = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// delete a note by id
app.delete("/notes/:id", async function (req, res) {
  try {
    let deleted = await Note.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// create a new note
app.post("/notes", async function (req, res) {
  try {
    let newNote = new Note({
      title: req.body.title,
      content: req.body.content,
    });
    let savedNote = await newNote.save();
    res.json(savedNote);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
