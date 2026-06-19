import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function NoteDetail() {
  const [note, setNote] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function loadNote() {
      const response = await fetch(`http://localhost:3000/notes/${id}`);
      const data = await response.json();
      setNote(data);
    }
    loadNote();
  }, [id]);

  if (!note) {
    return <p>Loading...</p>;
  }

  async function updateNote() {
    const response = await fetch(`http://localhost:3000/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: note.title, content: note.content }),
    });

    const newNote = await response.json();
    navigate(`/`);
  }
  return (
    <div>
      <h1>Note Detail</h1>
      <input
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
      />
      <textarea
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
      ></textarea>
      <button onClick={updateNote}>Update</button>
    </div>
  );
}

export default NoteDetail;
