import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  async function createNote() {
    const response = await fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, content: content }),
    });

    const newNote = await response.json();
    navigate(`/`);
  }

  return (
    <div>
      <h1>New Note</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button onClick={createNote}>Save</button>
    </div>
  );
}

export default NewNote;
