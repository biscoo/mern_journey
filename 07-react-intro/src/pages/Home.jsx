import { useState, useEffect } from "react";

function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Simulate fetching notes from an API
    async function loadNotes() {
      const response = await fetch("http://localhost:3000/notes");
      const data = await response.json();
      setNotes(data);
    }

    loadNotes();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <ul>
        {notes.map((note) => {
          return <li key={note._id}>{note.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default Home;
