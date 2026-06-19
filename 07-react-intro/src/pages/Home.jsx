import { useState, useEffect } from "react";
import NoteCard from "../components/NoteCard";

function Home() {
  // notes — holds the array of notes fetched from the backend, starts empty
  const [notes, setNotes] = useState([]);

  // loading — tracks whether the fetch is still in progress
  // starts as true because we haven't fetched anything yet
  const [loading, setLoading] = useState(true);

  // useEffect with [] runs once, when the component first mounts (page loads)
  useEffect(() => {
    // async function needed because fetch requires await,
    // and useEffect's callback itself can't be async directly
    async function loadNotes() {
      // send a GET request to our Express backend
      const response = await fetch("http://localhost:3000/notes");

      // convert the raw response into a usable JS array
      const data = await response.json();

      // store the fetched notes in state — triggers a re-render
      setNotes(data);

      // mark loading as finished so the real content can render
      setLoading(false);
    }

    // actually call the function — defining it alone doesn't run it
    loadNotes();
  }, []);

  // while data is still being fetched, show a loading message
  // this prevents trying to render notes before they exist
  if (loading) {
    return <p>Loading...</p>;
  }

  // once loading is false, render the actual list of notes
  return (
    <div>
      <h1>Home</h1>
      <ul>
        {notes.map((note) => {
          // NoteCard receives the note object as a prop named "data"
          // key is required by React to track each item in the list efficiently
          return <NoteCard key={note._id} data={note} />;
        })}
      </ul>
    </div>
  );
}

export default Home;
